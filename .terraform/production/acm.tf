resource "aws_acm_certificate" "front" {
  domain_name = module.variables.server_name
  validation_method = "DNS"

  tags = {
    Environment = "production"
  }

  lifecycle {
    create_before_destroy = true
  }
}
