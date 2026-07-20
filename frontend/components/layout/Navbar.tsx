import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold">
          CatalogAI
        </Link>

        <nav className="flex gap-6">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/new">New Product</Link>
          <Link href="/settings">Settings</Link>
        </nav>
      </div>
    </header>
  );
}