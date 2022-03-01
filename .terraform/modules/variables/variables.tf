variable "project_name" {
  description = "Project name that will be visible in AWS resources names"
  default     = "vancation-front"
}

variable "environment" {
  description = "Application environment"
}

variable "region" {
  description = "AWS Region"

  type = map(string)
  default = {
    staging    = "us-west-1"
    production = "us-west-1"
  }
}

variable "server_name" {
  description = "Domain name for application"

  type = map(string)
  default = {
    staging    = "dummy.ml"
    production = "REPLACE WITH YOUR DOMAIN" # EX 'getnaive.com'
  }
}

variable "instance_type" {
  description = "AWS EC2 instance type"

  type = map(string)
  default = {
    staging    = "t3a.nano"
    production = "t3a.nano"
  }
}

variable "swap_size" {
  description = "AWS EC2 instance Swap size in MB"

  type = map(number)
  default = {
    "t3.nano"    = 2048
    "t3a.nano"   = 2048
    "t3.micro"   = 2048
    "t3a.micro"  = 2048
    "t3.small"   = 2048
    "t3a.small"  = 2048
    "t3.medium"  = 4096
    "t3a.medium" = 4096
  }
}

variable "task_cpu" {
  description = "The number of CPU units used by the task"

  type = map(number)
  default = {
    "t3.nano"    = 1792
    "t3a.nano"   = 1792
    "t3.micro"   = 1792
    "t3a.micro"  = 1792
    "t3.small"   = 1792
    "t3a.small"  = 1792
    "t3.medium"  = 1792
    "t3a.medium" = 1792
  }
}

variable "task_memory" {
  description = "The amount (in MiB) of memory used by the task"

  type = map(number)
  default = {
    "t3.nano"    = 397
    "t3a.nano"   = 397
    "t3.micro"   = 893
    "t3a.micro"  = 893
    "t3.small"   = 1792
    "t3a.small"  = 1792
    "t3.medium"  = 3584
    "t3a.medium" = 3584
  }
}

variable "min_task_count" {
  description = "AWS ECS Cluster Minimum task count"

  type = map(number)
  default = {
    staging    = 1
    production = 1
  }
}

variable "max_task_count" {
  description = "AWS ECS Cluster Maximum task count"

  type = map(number)
  default = {
    staging    = 1
    production = 2
  }
}

variable "deployment_maximum_percent" {
  description = "Service deployment Maximum percent"

  type = map(number)
  default = {
    staging    = 100
    production = 100
  }
}

variable "log_retention_in_days" {
  description = "CloudWatch Logs retention period in days"

  type = map(number)

  default = {
    staging    = 30
    production = 90
  }
}
