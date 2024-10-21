import ddb from "./db.server";
import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

import { Product } from "@/types";
import { z } from "zod";
import { productSchema } from "@/lib/validations";

export const getProducts = async () => {
    const params = {
        TableName: "test",
        Key: {
            "id": { S: "dfsfs" }
        }
    };

    const { Item } = await ddb.send(new GetItemCommand(params));

    console.log(Item);

    return Item;
}

export const createProduct = async (product: Product) => {
    try {
        const validatedProduct = productSchema.safeParse(product);

        if (!validatedProduct.success) {
            return {
                msg: validatedProduct.error.issues.map((issue) => issue.message).join(", ")
            };
        }

        const params = {
            TableName: "test",
            Item: {
                "id": { S: product.id },
                "name": { S: product.name },
                "price": { N: product.price.toString() },
                "description": { S: product.description },
                "image": { S: product.image },
                "category": { SS: product.category }
            }
        };

        const data = await ddb.send(new PutItemCommand(params));

        return data;

    } catch (error: any) {
        return;
    }
}