# SSL verify ----------------

output "acm_front_record" {
  value = aws_acm_certificate.front.domain_validation_options[0]
}
