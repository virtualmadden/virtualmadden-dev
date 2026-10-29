resource "aws_acm_certificate" "site" {
  provider = aws.us_east_1

  domain_name               = local.domain_name
  subject_alternative_names = ["www.${local.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# The validation records live in the shared virtualmadden.dev zone (dns-configuration),
# copied from the dns_records output. ACM renews against the same records.
resource "aws_acm_certificate_validation" "site" {
  provider = aws.us_east_1

  certificate_arn = aws_acm_certificate.site.arn

  # Fail a deploy in minutes, not the 75m default, when the records are missing.
  timeouts {
    create = "20m"
  }
}
