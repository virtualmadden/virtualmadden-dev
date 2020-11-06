#!/bin/bash
set -e

WORKSPACE=${1-prod}
terraform_state_bucket="vrtlmdn-terraform-state"

pushd infrastructure/terraform
terraform init \
    -backend-config bucket="${terraform_state_bucket}"
if ! terraform workspace select ${WORKSPACE}; then
    terraform workspace new ${WORKSPACE}
fi
terraform apply -auto-approve
popd

# The site doesn't get deployed by terraform, because
npm run deploy:${WORKSPACE}
