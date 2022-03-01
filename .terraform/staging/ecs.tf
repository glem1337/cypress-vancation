# Task definition

data "template_file" "container_definitions" {
  template = file("${path.module}/templates/container_definitions.json")

  vars = {
    environment = module.variables.environment

    web_server_ecr_repo = module.main.ecr_repositories.web_server.repository_url
    app_ecr_repo        = module.main.ecr_repositories.app.repository_url

    log_group  = module.main.aws_cloudwatch_log_group.name
    log_region = module.variables.region
  }
}

resource "aws_ecs_task_definition" "this" {
  family       = module.variables.project_name_env
  network_mode = "bridge"
  cpu          = module.variables.task_cpu
  memory       = module.variables.task_memory

  container_definitions = data.template_file.container_definitions.rendered

  volume {
    name = "static"
  }
}

# Service

resource "aws_ecs_service" "this" {
  name                               = module.variables.project_name_env
  cluster                            = module.ecs_cluster.cluster.id
  health_check_grace_period_seconds  = 36000
  task_definition                    = aws_ecs_task_definition.this.arn
  desired_count                      = module.variables.min_task_count
  deployment_minimum_healthy_percent = module.variables.deployment_minimum_healthy_percent
  deployment_maximum_percent         = module.variables.deployment_maximum_percent

  load_balancer {
    container_name   = "web-server"
    container_port   = 8080
    target_group_arn = aws_lb_target_group.this.arn
  }

  depends_on = [
    module.global.ecs_instance_iam_role
  ]

  lifecycle {
    ignore_changes = [desired_count]
  }
}
