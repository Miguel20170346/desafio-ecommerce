"use client";

import Image from "next/image";
import { toast } from "sonner";
import type { CartItem } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { incrementar, decrementar, eliminar } from "@/redux/cartSlice";

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const dispatch = useAppDispatch();

  // Eliminar CON CONFIRMACIÓN (requisito del PDF), usando Sonner en vez de alert.
  const handleEliminar = () => {
    toast(`¿Eliminar "${item.name}" del carrito?`, {
      action: {
        label: "Eliminar",
        onClick: () => {
          dispatch(eliminar(item.id));
          toast.success("Producto eliminado del carrito");
        },
      },
    });
  };

  return (
    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4">
      {/* Imagen a la izquierda (next/image) */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Datos y controles */}
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="truncate font-semibold text-slate-900">{item.name}</h3>
        <span className="text-sm text-slate-500">
          ${item.price.toFixed(2)} c/u
        </span>

        <div className="mt-auto flex items-center justify-between pt-2">
          {/* Controles de cantidad (incrementar / decrementar) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(decrementar(item.id))}
              disabled={item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-lg font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:opacity-40"
              aria-label="Disminuir cantidad"
            >
              −
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => dispatch(incrementar(item.id))}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-lg font-medium text-slate-700 transition-colors hover:bg-slate-100"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>

          {/* Subtotal de esta línea */}
          <span className="font-bold text-slate-900">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Botón eliminar */}
      <button
        onClick={handleEliminar}
        className="self-start text-sm font-medium text-red-500 transition-colors hover:text-red-700"
        aria-label="Eliminar producto"
      >
        Eliminar
      </button>
    </div>
  );
}
