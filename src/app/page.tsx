import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    // Contenedor centrado con ancho máximo y padding responsivo (mobile-first).
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Catálogo de <span className="text-indigo-600">NovaShop</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
          Explora nuestros 20 productos y filtra por categoría.
        </p>
      </section>

      {/* Catálogo con filtro por categorías */}
      <ProductGrid />
    </div>
  );
}
