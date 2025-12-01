import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Product Dashboard",
  description: "Mini Product Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800">Product Dashboard</h1>
            </div>
            <nav className="px-4 space-y-2">
              <Link
                href="/"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/products"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
              >
                Products
              </Link>
              <Link
                href="/products/add"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
              >
                Add Product
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="ml-64 p-8">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
