"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { vaciarCarrito } from "@/redux/cartSlice";
import CartItemCard from "@/components/CartItemCard";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  // Total a pagar: suma de (precio x cantidad) de cada línea.
  const total = items.reduce(
    (suma, item) => suma + item.price * item.quantity,
    0
  );

  // Vaciar todo CON CONFIRMACIÓN (Sonner).
  const handleVaciar = () => {
    toast("¿Vaciar todo el carrito?", {
      action: {
        label: "Vaciar",
        onClick: () => {
          dispatch(vaciarCarrito());
          toast.success("Carrito vaciado");
        },
      },
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
        Tu carrito
      </h1>

      {items.length === 0 ? (
        /* Estado vacío */
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-500">Tu carrito está vacío.</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Ver catálogo
          </Link>
        </div>
      ) : (
        <>
          {/* Lista de productos del carrito */}
          <div className="space-y-3">
            {items.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>

          {/* Resumen y acciones */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium text-slate-600">Total</span>
              <span className="font-bold text-slate-900">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleVaciar}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                Vaciar carrito
              </button>
              <Link
                href="/checkout"
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Proceder al pago
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
