import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-blue-600">20</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <p className="text-3xl font-bold text-green-600">4</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <Link href="/products/add">
            <Button className="mt-2">Add New Product</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
