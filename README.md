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

## Environments

Each environment is its own AWS account from [aws-organization](https://github.com/virtualmadden/aws-organization):

| Environment | Account | URL | Deploys on |
| --- | --- | --- | --- |
| prod | `virtualmadden-dev-prod` (502869771296) | https://virtualmadden.dev | push to `main` |
| dev | `virtualmadden-dev-dev` (757517308509) | https://dev.virtualmadden.dev | pull requests from this repo's branches |

GitHub Actions assumes the account's `github-deploy` role over OIDC; there are no stored AWS keys. The prod role only trusts `main`. Forked and Dependabot PRs run checks but don't deploy.

Each deploy:
1. Builds the site.
2. Applies [`infrastructure/terraform`](infrastructure/terraform) with `env/<env>.tfvars`. State is in the account's `tfstate-<account>-us-west-2` bucket.
3. Uploads `dist/` and invalidates CloudFront.

## Infrastructure

Per environment:
- A Route53 zone for the domain.
- An ACM certificate.
- A private S3 bucket.
- A CloudFront distribution reaching the bucket through Origin Access Control, with A/AAAA aliases for the apex and `www`.

Unknown paths serve `index.html`.

DNS delegation:
- **prod:** Porkbun points `virtualmadden.dev` at the prod zone through [dns-configuration](https://github.com/virtualmadden/dns-configuration)'s `project-domains.auto.tfvars`.
- **dev:** the prod zone delegates `dev.virtualmadden.dev` to the dev zone through `subdomain_delegations` in [`env/prod.tfvars`](infrastructure/terraform/env/prod.tfvars).

If either zone is recreated, its nameservers change and the matching entry must be updated.

To run Terraform locally:

```sh
aws sso login
export AWS_PROFILE=virtualmadden-dev-prod   # or virtualmadden-dev-dev
cd infrastructure/terraform
terraform init -reconfigure -backend-config=env/prod.s3.tfbackend
terraform plan -var-file=env/prod.tfvars
```

### Standing up an environment from nothing

The certificate only validates once the zone is reachable, so a new zone has to be delegated before the full apply:

1. **Create both zones:**
   - prod: `terraform apply -var-file=env/prod.tfvars -target=aws_route53_zone.this`
   - Then the same for dev with `env/dev.tfvars`.
2. **Delegate them:**
   - Add prod's `name_servers` output to dns-configuration and merge.
   - Put dev's `name_servers` in `subdomain_delegations` in `env/prod.tfvars`.
3. **Run a full `terraform apply`:** prod first, so dev's delegation exists, then dev.
