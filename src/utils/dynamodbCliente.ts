import { DynamoDB } from "aws-sdk";

const options = {
  region: "localhost",
  endpoint: "http://localhost:8000"
};

const isOffiline = () => {
  return process.env.IS_OFFLINE;
};

export const document = isOffiline() 
                        ? new DynamoDB.DocumentClient(options)
                        : new DynamoDB.DocumentClient();