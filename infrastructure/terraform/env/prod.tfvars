environment = "prod"
account_id  = "502869771296"
domain_name = "virtualmadden.dev"

# dev.virtualmadden.dev lives in virtualmadden-dev-dev. Its nameservers come from
# `terraform output name_servers` in the dev environment.
subdomain_delegations = {
  dev = [
    "ns-1000.awsdns-61.net",
    "ns-1436.awsdns-51.org",
    "ns-1736.awsdns-25.co.uk",
    "ns-363.awsdns-45.com",
  ]
}
