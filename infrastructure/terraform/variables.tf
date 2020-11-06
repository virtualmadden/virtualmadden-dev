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

terraform {
  backend "s3" {
    bucket  = "terraform-state-config"
    key     = local.domain_name
    region  = var.region
  }
  required_version = ">= 0.13"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.14"
    }
  }
}
