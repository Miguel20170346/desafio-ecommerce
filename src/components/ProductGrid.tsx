"use client";

import { useMemo, useState } from "react";
import { products, categories } from "@/lib/products";
import type { Category } from "@/types";
import ProductCard from "./ProductCard";

// "Todos" es una opción extra para quitar el filtro y ver el catálogo completo.
type Filter = Category | "Todos";

export default function ProductGrid() {
  // Estado local: qué filtro está activo. Empieza en "Todos".
  const [selected, setSelected] = useState<Filter>("Todos");

  // Lista de botones: "Todos" + todas las categorías del catálogo.
  const filters: Filter[] = ["Todos", ...categories];

  // Filtra los productos según la categoría elegida.
  // useMemo evita recalcular en cada render si nada cambió.
  const visibleProducts = useMemo(() => {
    if (selected === "Todos") return products;
    return products.filter((p) => p.category === selected);
  }, [selected]);

  return (
    <div>
      {/* Botones de filtrado por categoría */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelected(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selected === filter
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Cuadrícula de productos: 1 columna en móvil, 2 en pantallas grandes */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
