"use client";

import { useState, useEffect, useMemo } from "react";
import { Product, ProductFormData } from "@/lib/types";
import { getProducts, deleteProduct, addProduct, updateProduct } from "@/lib/api";
import ProductTable from "@/components/products/productTable";
import ProductModal from "@/components/products/ProductModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Product deleted successfully!");
      } catch (error) {
        console.error("Failed to delete product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleAddProduct = async (data: ProductFormData) => {
    try {
      const newProduct = await addProduct(data);
      setProducts([...products, newProduct]);
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("Failed to add product");
      throw error;
    }
  };

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!selectedProduct) return;
    
    try {
      const updatedProduct = await updateProduct(selectedProduct.id, data);
      setProducts(
        products.map((p) => (p.id === selectedProduct.id ? { ...p, ...updatedProduct } : p))
      );
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product");
      throw error;
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={openAddModal}>Add New Product</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="men's clothing">Men's Clothing</SelectItem>
            <SelectItem value="women's clothing">Women's Clothing</SelectItem>
            <SelectItem value="jewelery">Jewelery</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Showing {paginatedProducts.length} of {filteredProducts.length} products
      </div>
      <ProductTable 
        products={paginatedProducts} 
        onDelete={handleDelete}
        onEdit={openEditModal}
      />

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={modalMode === "add" ? handleAddProduct : handleUpdateProduct}
        initialData={selectedProduct}
        mode={modalMode}
      />
    </div>
  );
}
