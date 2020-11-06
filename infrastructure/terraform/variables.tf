variable "region" {
  default = "us-west-2"
}

provider "aws" {
  region = var.region
}

variable "app_namespace" {
  default = "virtualmadden"
}

locals {
  bucket_name = "${replace(var.app_namespace, "_", "-")}-${terraform.workspace}-client"
  domain_name = "${var.app_namespace}.dev"
}

data "aws_caller_identity" "current" {}

terraform {
  backend "s3" {
    bucket  = "vrtlmdn-terraform-state"
    key     = "virtualmadden-dev"
    region  = "us-west-2"
  }
  required_version = ">= 0.13"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.14"
    }
  }
}
