import {Product} from "@/types";
import { z } from "zod";


export const productSchema = z.object({
    id: z.string({required_error: "ID is required"}),
    name: z.string({required_error: "Name is required"}),
    price: z.number({required_error: "Price is required"}),
    description: z.string({required_error: "Description is required"}),
    image: z.string({required_error: "Image is required"}),
    category: z.array(z.string(),{required_error: "Category is required"})
});