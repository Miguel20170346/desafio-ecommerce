"use client";

import Image from "next/image";
import { toast } from "sonner";
import type { Product } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/cartSlice";

// Recibe un producto por props y lo muestra en una tarjeta.
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Hook para ENVIAR acciones a Redux (escribir en el "documento compartido").
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    // 1) Escribimos en el carrito global (Redux).
    dispatch(addToCart(product));
    // 2) Mostramos un mensaje bonito de confirmación (Sonner, no alert).
    toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <article className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Imagen del producto a la izquierda del nombre (next/image) */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-28 sm:w-28">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 96px, 112px"
          className="object-cover"
        />
      </div>

      {/* DATOS a la derecha */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Categoría como etiqueta */}
        <span className="mb-1 w-fit rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
          {product.category}
        </span>

        <h3 className="truncate text-base font-semibold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>

          {/* Botón que agrega el producto al carrito global */}
          <button
            onClick={handleAdd}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
