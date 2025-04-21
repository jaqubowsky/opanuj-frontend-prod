import {
  CloudWatchClient,
  PutMetricDataCommand,
  PutMetricDataCommandInput,
} from "@aws-sdk/client-cloudwatch";
import { Handler } from "aws-lambda";

interface EventInput {
  body: string;
}

interface LambdaResponse {
  headers: { [key: string]: string };
  statusCode: number;
  body: string;
}

const cloudWatchClient = new CloudWatchClient({ region: "eu-central-1" });

export const handler: Handler<EventInput, LambdaResponse> = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;
  if (!body) return buildResponse(400, `Invalid payload.`);

  const params: PutMetricDataCommandInput = {
    Namespace: "AppMonitoring",
    MetricData: [
      {
        MetricName: "FrontendErrors",
        Dimensions: [{ Name: "Environment", Value: "Production" }],
        Unit: "Count",
        Value: 1,
      },
    ],
  };

  const command = new PutMetricDataCommand(params);
  await cloudWatchClient.send(command);
  return buildResponse(200, `Metric sent successfully.`);
};

function buildResponse(statusCode: number, body: string): LambdaResponse {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode,
    body,
  };
}
