"use client";

import { addProduct } from "@/lib/api";
import ProductForm from "@/components/products/productForm";

export default function AddProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <ProductForm onSubmit={addProduct} submitLabel="Add Product" />
    </div>
  );
}
