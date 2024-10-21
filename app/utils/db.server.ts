// connect to dynamodb
import { DynamoDBClient, ListBackupsCommand } from "@aws-sdk/client-dynamodb";

declare global {
    var __db: DynamoDBClient;
}

let ddb : DynamoDBClient;
let access = process.env.AWS_ACCESS_KEY_ID || '';
let secret = process.env.AWS_SECRET_ACCESS_KEY || '';

if (process.env.NODE_ENV === "development") {
    ddb = new DynamoDBClient({
        region:'us-east-1',
        credentials:{
            accessKeyId: access,
            secretAccessKey: secret
        }
    });
} else {
    if (global.__db) {
        ddb = global.__db;
    } else {
        ddb = new DynamoDBClient({
            region:'us-east-1',
            credentials:{
                accessKeyId: access,
                secretAccessKey: secret
            }
        });
        global.__db = ddb;
    }
}

export default ddb;
