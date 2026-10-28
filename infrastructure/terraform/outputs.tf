output "site_bucket" {
  description = "Upload target for the built site (dist/)."
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "Invalidate after uploading."
  value       = aws_cloudfront_distribution.site.id
}

output "name_servers" {
  description = "Delegate the zone here: prod in dns-configuration, dev in prod's subdomain_delegations."
  value       = aws_route53_zone.this.name_servers
}

output "url" {
  value = "https://${var.domain_name}"
}
