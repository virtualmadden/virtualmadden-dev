resource "aws_s3_bucket" "origin" {
  bucket = "${var.domain}"
  acl    = "private"
}
