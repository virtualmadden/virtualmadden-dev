variable "region" {
  default = "us-west-2"
}

provider "aws" {
  region = "${var.region}"
}

variable "domain" {
  default = "virtualmadden.dev"
}

data "aws_caller_identity" "current" {}

terraform {
  backend "s3" {
    bucket               = "vrtlmdn-terraform-state"
    key                  = "virtualmadden-dev"
    region               = "us-west-2"
  }
}
