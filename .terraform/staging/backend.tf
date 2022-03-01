# Backend can't use variables, values have to be hardcoded

terraform {
  backend "remote" {
    organization = "vancation"

    workspaces {
      name = "staging-front"
    }
  }
}
