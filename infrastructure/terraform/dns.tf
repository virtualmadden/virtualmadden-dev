# The zone for this environment's domain. Prod's nameservers go to Porkbun via
# dns-configuration's project-domains.auto.tfvars; dev's go into prod's
# subdomain_delegations.
resource "aws_route53_zone" "this" {
  name = var.domain_name
}

resource "aws_route53_record" "site" {
  for_each = toset(flatten([for name in local.aliases : [for type in ["A", "AAAA"] : "${name}/${type}"]]))

  zone_id = aws_route53_zone.this.zone_id
  name    = split("/", each.key)[0]
  type    = split("/", each.key)[1]

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "delegation" {
  for_each = var.subdomain_delegations

  zone_id = aws_route53_zone.this.zone_id
  name    = "${each.key}.${var.domain_name}"
  type    = "NS"
  ttl     = 3600
  records = [for ns in each.value : trimsuffix(ns, ".")]
}
