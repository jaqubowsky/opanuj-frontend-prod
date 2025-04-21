data "external" "lambda_builder_sh" {
  program = ["bash", "-c", "cd ${var.lambda_source_dir} && npm install > '/dev/null' 2>&1 && npm run build > '/dev/null' 2>&1 && echo \"{ }\" "]
}



resource "aws_iam_role" "lambda_exec" {
  name = "LambdaExecutionRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "lambda_logging_policy" {
  name = "LambdaErrorLoggingPolicy"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "cloudwatch:PutMetricData",
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect   = "Allow",
        Resource = "arn:aws:logs:*:*:*"
      },
    ]
  })
}

resource "aws_iam_role_policy" "lambda_metric_policy" {
  name = "LambdaErrorMetricsPolicy"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action   = "cloudwatch:PutMetricData",
        Effect   = "Allow",
        Resource = "*"
      },
    ]
  })
}

resource "aws_lambda_function" "error_lambda" {
  function_name = "${var.name}-error-lambda"
  runtime       = var.lambda_runtime
  handler       = "index.handler"
  role          = aws_iam_role.lambda_exec.arn

  filename         = "${var.lambda_source_dir}/dist/opanuj-frontend-error-lambda.zip"
  source_code_hash = filesha256("${var.lambda_source_dir}/index.ts")

  depends_on = [
    data.external.lambda_builder_sh
  ]

  tags = {
    Name = "${var.name}-error-lambda"
  }
}
