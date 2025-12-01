"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProduct, updateProduct } from "@/lib/api";
import { Product } from "@/lib/types";
import ProductForm from "@/components/products/productForm";

export default function EditProductPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProduct(id);
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData: any) => {
    await updateProduct(id, formData);
  };

  if (loading) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <ProductForm
        initialData={product}
        onSubmit={handleUpdate}
        submitLabel="Update Product"
      />
    </div>
  );
}
