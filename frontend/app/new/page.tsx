import ProductForm from "@/components/forms/ProductForm";

export default function NewProductPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Create Product
      </h1>

      <ProductForm />
    </main>
  );
}