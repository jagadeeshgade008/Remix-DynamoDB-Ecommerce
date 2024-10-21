import {productSchema} from "@/lib/validations";
import { z } from "zod";

// export type Product = {
//     id: string;
//     name: string;
//     price: number;
//     description: string;
//     image: string;
//     // category: <T>(arg: T) => T; // ["electronics", "clothing", "food"] []
//     // array of strings, each string 
//     category: string[];
// };

export type Product = z.infer<typeof productSchema>;