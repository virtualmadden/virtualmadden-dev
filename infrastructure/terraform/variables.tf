variable "environment" {
  description = "dev or prod."
  type        = string

  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "environment must be dev or prod."
  }
}

variable "account_id" {
  description = "The environment's AWS account (aws-organization virtualmadden-dev-<env>). Applies to any other account are refused."
  type        = string
}

variable "domain_name" {
  description = "Apex the site serves; www.<domain_name> redirects to the same distribution."
  type        = string
}

variable "subdomain_delegations" {
  description = "Child zones hosted in other accounts, keyed by subdomain label, valued by their nameservers. Used by prod to delegate dev.<domain_name>."
  type        = map(list(string))
  default     = {}
}

locals {
  aliases = [var.domain_name, "www.${var.domain_name}"]

  tags = {
    Project     = "virtualmadden-dev"
    Environment = var.environment
    ManagedBy   = "virtualmadden-dev"
  }
}
