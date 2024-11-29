import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import axios from "axios";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [products, setProducts] = useState([]);
  
  // ini masih contoh template
  useEffect(() => {
    axios.get("http://localhost:3000/api/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <p>{products}</p>
  );
}
