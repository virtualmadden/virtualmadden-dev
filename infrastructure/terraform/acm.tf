provider "aws" {
  region = "us-east-1"
  alias  = "certs"
}

resource "aws_acm_certificate" "cert" {
  domain_name               = "${var.domain}"
  subject_alternative_names = ["www.${var.domain}"]
  validation_method         = "DNS"
  
  lifecycle {
    create_before_destroy = true
  }

  provider = "aws.certs"
}

resource "aws_route53_record" "cert_validation" {
  name    = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_name}"
  type    = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_type}"
  zone_id = "${aws_route53_zone.origin.zone_id}"
  records = [
    "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_value}"
  ]
  ttl     = 60
  allow_overwrite = true
}

resource "aws_route53_record" "cert_validation_alt" {
  name    = "${aws_acm_certificate.cert.domain_validation_options.1.resource_record_name}"
  type    = "${aws_acm_certificate.cert.domain_validation_options.1.resource_record_type}"
  zone_id = "${aws_route53_zone.origin.zone_id}"
  records = [
    "${aws_acm_certificate.cert.domain_validation_options.1.resource_record_value}"
  ]
  ttl     = 60
  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = "${aws_acm_certificate.cert.arn}"

  validation_record_fqdns = [
    "${aws_route53_record.cert_validation.fqdn}",
    "${aws_route53_record.cert_validation_alt.fqdn}"
  ]

  provider = "aws.certs"
}
