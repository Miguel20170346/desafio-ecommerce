import Image from "next/image";
import type { Product } from "@/types";

// Recibe un producto por props y lo muestra en una tarjeta.
// El botón "Agregar al carrito" se conectará con Redux en el Paso 5.
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* IMAGEN a la izquierda del nombre (requisito del PDF) usando next/image */}
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
        </div>
      </div>
    </article>
  );
}
