locals {
  # virtualmadden-dev-prod (aws-organization). Applies to any other account are refused.
  account_id = "502869771296"

  # Apex the site serves; www.<domain_name> serves the same distribution. Both point here
  # from the shared virtualmadden.dev zone in dns-configuration.
  domain_name = "virtualmadden.dev"
  aliases     = [local.domain_name, "www.${local.domain_name}"]

  tags = {
    Project     = "virtualmadden-dev"
    Environment = "prod"
    ManagedBy   = "virtualmadden-dev"
  }
}
