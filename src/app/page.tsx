export default function Home() {
  return (
    // Contenedor centrado con ancho máximo y padding responsivo (mobile-first).
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Bienvenido a <span className="text-indigo-600">NovaShop</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          Tu tienda en línea. Muy pronto verás aquí el catálogo de productos.
        </p>
      </section>
    </div>
  );
}
