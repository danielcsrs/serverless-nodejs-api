import uuid from "uuid";
import * as dynamoDbLib from "../../../libs/dynamodb-lib";
import { success, failure } from "../../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "customers",
    Item: {
      customerId: data.customerId,
      document: data.document,
      name: data.name,
      mail: data.mail,
      phone: data.phone,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}