import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { Button } from "@/components/ui/button"
import { useSubmit } from "@remix-run/react";

// uuidv4
import { v4 as uuidv4 } from 'uuid';

import { getProducts, createProduct } from "@/utils/products.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return getProducts();
}

export const action: ActionFunction = async () => {
  let data = await createProduct({
    id: uuidv4(),
    name: "Test",
    price: 10,
    description: "This is a test product",
    image: "https://via.placeholder.com/150",
    category: ["electronics", "clothing", "food"]
  });
  return data;
}

export default function Index() {

  const products = useLoaderData();
  console.log(products);
  const formSubmit = useSubmit();

  const submit = async () => {
    // await createProduct({
    //   id: "1",
    //   name: "Test",
    //   price: 10,
    //   description: "This is a test product",
    //   image: "https://via.placeholder.com/150"
    // });

    const formData = new FormData();
    formData.append("myKey", "myValue");
    formSubmit(formData, {
      method: "post",
      navigate: false
    });

  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Button onClick={submit}>Click me</Button>
      {/* {JSON.stringify(products)} */}
    </div>
  );
}


