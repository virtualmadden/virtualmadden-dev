# virtualmadden.dev

Personal site: React 19, TypeScript and Vite, served from S3 through CloudFront.

## Local development

```sh
corepack enable
yarn install
yarn dev        # http://localhost:5173
yarn lint
yarn test:ci
yarn build      # dist/
```

## Deploys

The site runs in `virtualmadden-dev-prod` (502869771296), an account from [aws-organization](https://github.com/virtualmadden/aws-organization). There is no hosted dev environment; preview locally with `yarn build && yarn preview`.

| Event | Runs |
| --- | --- |
| Pull request | Lint, test and build; `terraform plan` against prod, shown in the run summary |
| Push to `main` | The same checks, then a deploy to https://virtualmadden.dev |

GitHub Actions uses OIDC; there are no stored AWS keys:
- PRs assume `github-plan`, which is read-only, so a PR can't change prod.
- `main` assumes `github-deploy`.

Forked and Dependabot PRs run checks only.

Each deploy:
1. Builds the site.
2. Applies [`infrastructure/terraform`](infrastructure/terraform). State is in `tfstate-502869771296-us-west-2`.
3. Uploads `dist/` and invalidates CloudFront.

## Infrastructure

- An ACM certificate.
- A private S3 bucket.
- A CloudFront distribution reaching the bucket through Origin Access Control, serving the apex and `www`.
- A response headers policy: HSTS, `X-Frame-Options: DENY`, and a strict Content Security Policy that only allows the site's own origin. The page loads nothing from other origins and has no inline scripts or styles; keep it that way, or the CSP in [`site.tf`](infrastructure/terraform/site.tf) must change with it.

Unknown paths return a real 404 with [`public/404.html`](public/404.html).

DNS lives in the shared `virtualmadden.dev` zone in [dns-configuration](https://github.com/virtualmadden/dns-configuration)'s `shared-records.auto.tfvars`:
- aliases for the apex and `www`
- the certificate's validation CNAMEs

`terraform output dns_records` prints the values. They only change if the distribution or certificate is replaced, which a plan shows in advance; update dns-configuration before merging such a change.

To run Terraform locally:

```sh
aws sso login
export AWS_PROFILE=virtualmadden-dev-prod
cd infrastructure/terraform
terraform init
terraform plan
```

### Standing up from nothing

The certificate validates only once its records are in the shared zone:

1. `terraform apply -target=aws_acm_certificate.site`, then add the `dns_records` validation CNAMEs to dns-configuration and merge.
2. `terraform apply`, then add the alias records for the `alias_target` and merge.
