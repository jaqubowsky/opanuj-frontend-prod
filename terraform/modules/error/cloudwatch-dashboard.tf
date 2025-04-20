resource "aws_cloudwatch_dashboard" "error_dashboard" {
  dashboard_name = "${var.name}-dashboard"

  dashboard_body = jsonencode({
    widgets = [
      {
        type = "metric",
        x    = 0,
        y    = 0,
        width = 12,
        height = 6,

        properties = {
          title = "Frontend Error Count"
          metrics = [
            [var.metric_namespace, var.metric_name, "Environment", var.metric_dimensions["Environment"],]
          ]
          period = 86400 * 7 # 7 days
          stat = "Sum"
          region = var.aws_region
        }
      },
      {
        type = "alarm",
        x    = 0,
        y    = 6,
        width = 12,
        height = 6,
        properties = {
          title = "Error Alarm Status"
          alarms = [aws_cloudwatch_metric_alarm.alarm.arn]
        }
      }
    ]
  })
}
