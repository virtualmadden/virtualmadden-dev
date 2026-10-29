output "site_bucket" {
  description = "Upload target for the built site (dist/)."
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "Invalidate after uploading."
  value       = aws_cloudfront_distribution.site.id
}

output "dns_records" {
  description = "What this site needs in the shared virtualmadden.dev zone (dns-configuration): aliases for the apex and www, and the certificate's validation CNAMEs."
  value = {
    alias_target = aws_cloudfront_distribution.site.domain_name
    certificate_validation = {
      for dvo in aws_acm_certificate.site.domain_validation_options : dvo.resource_record_name => dvo.resource_record_value
    }
  }
}

output "url" {
  value = "https://${local.domain_name}"
}
