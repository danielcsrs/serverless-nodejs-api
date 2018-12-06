import * as dynamoDbLib from "../../../libs/dynamodb-lib";
import { success, failure } from "../../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "invoices",
    Key: {
      customerId: event.pathParameters.customerId,
      invoiceId: event.pathParameters.id
    },
    UpdateExpression: "SET document = :amount, name = :until, mail = :mail, phone = :phone",
    ExpressionAttributeValues: {
      ":amount": data.amount || null,
      ":until": data.until || null,
      ":mail": data.mail || null,
      ":phone": data.phone || null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}