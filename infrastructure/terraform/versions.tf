terraform {
  required_version = ">= 1.17.1"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.71"
    }
  }

  # Per-environment bucket: terraform init -backend-config=env/<env>.s3.tfbackend
  backend "s3" {}
}

provider "aws" {
  region              = "us-west-2"
  allowed_account_ids = [var.account_id]

  default_tags {
    tags = local.tags
  }
}

# CloudFront only accepts ACM certificates from us-east-1.
provider "aws" {
  alias               = "us_east_1"
  region              = "us-east-1"
  allowed_account_ids = [var.account_id]

  default_tags {
    tags = local.tags
  }
}
