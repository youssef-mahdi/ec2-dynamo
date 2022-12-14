import express from "express";
import { DynamoDBDocument, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
const app = express();
const port = 3000;
const translateConfig = {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
  unmarshallOptions: {
    wrapNumbers: false,
  },
};
app.get("/", async (req, res) => {
    console.log('req')
try {
    const client = new DynamoDB({
     region:'eu-west-1'
      });
      const ddbDocClient = DynamoDBDocument.from(client, translateConfig);
      const response = await ddbDocClient.send(
        new ScanCommand({
          TableName: "popularArticleViews",
        })
      );
      console.log(response);
      res.send(response);
} catch (error) {
    console.log(error)
    res.send(error)
}
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
