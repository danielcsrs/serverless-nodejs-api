import * as dynamoDbLib from "../../../libs/dynamodb-lib";
import { success, failure } from "../../../libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "invoices",
    KeyConditionExpression: "customerId = :customerId",
    ExpressionAttributeValues: {
      ":customerId": event.pathParameters.customerId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}