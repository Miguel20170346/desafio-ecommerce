"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

// Barra de navegación superior. Se coloca en el layout para que
// aparezca en todas las páginas de la tienda.
export default function Navbar() {
  // LEEMOS el carrito global y sumamos todas las cantidades.
  // Así el contador refleja el total de unidades, no solo productos distintos.
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((suma, item) => suma + item.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / marca: enlaza al inicio */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Nova<span className="text-indigo-600">Shop</span>
        </Link>

        {/* Enlaces de la derecha */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="/login"
            className="text-slate-600 transition-colors hover:text-indigo-600"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/cart"
            className="relative rounded-lg bg-indigo-600 px-3 py-2 text-white transition-colors hover:bg-indigo-700"
          >
            Carrito
            {/* Insignia con el número de productos (solo si hay al menos 1) */}
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
