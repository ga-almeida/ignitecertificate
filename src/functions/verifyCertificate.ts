import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from '../utils/dynamodbCliente'

export const handle: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  const response = await document.query({
    TableName: "users_certificate",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise();

  const userCertificate = response.Items[0];

  if (userCertificate) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Certificate valid!",
        name: userCertificate.name,
        url: `url_aws/${id}.pdf`
      }),
      headers: {
        "Content-type": "applications/json",
      },
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Certificate invalid!",
    }),
    headers: {
      "Content-type": "applications/json",
    },
  };
}