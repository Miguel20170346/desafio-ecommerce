"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { vaciarCarrito } from "@/redux/cartSlice";
import { generarFacturaPDF, generarNumeroFactura } from "@/lib/invoice";
import type { Invoice } from "@/types";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);

  // Guardamos la factura generada para mostrar la pantalla de éxito.
  const [factura, setFactura] = useState<Invoice | null>(null);
  // Indica si ya se "envió" la factura por correo (envío simulado).
  const [enviado, setEnviado] = useState(false);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleComprar = () => {
    // Armamos los datos de la factura con el carrito y el usuario en sesión.
    const nueva: Invoice = {
      numero: generarNumeroFactura(),
      fecha: new Date().toLocaleString("es-ES"),
      cliente: { name: user!.name, email: user!.email },
      items,
      total,
    };

    // Generamos el PDF y lo descargamos.
    const doc = generarFacturaPDF(nueva);
    doc.save(`${nueva.numero}.pdf`);

    setFactura(nueva); // pasamos a la pantalla de éxito
    dispatch(vaciarCarrito()); // vaciamos el carrito tras comprar
    toast.success("¡Compra realizada! Tu factura se ha descargado.");
  };

  // Permite volver a descargar la factura desde la pantalla de éxito.
  const handleDescargar = () => {
    if (!factura) return;
    const doc = generarFacturaPDF(factura);
    doc.save(`${factura.numero}.pdf`);
  };

  // Envío de la factura por correo (simulado, como permite el PDF).
  // Muestra una confirmación clara de que la factura fue enviada al cliente.
  const handleEnviarCorreo = () => {
    if (!factura) return;
    setEnviado(true);
    toast.success(`Factura enviada al correo ${factura.cliente.email}`);
  };

  // --- Pantalla de ÉXITO (después de comprar) ---
  if (factura) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center sm:px-6">
        <div className="rounded-xl border border-green-200 bg-green-50 p-8">
          <h1 className="text-2xl font-bold text-green-700">
            ¡Compra realizada! ✅
          </h1>
          <p className="mt-2 text-slate-600">
            Factura <strong>{factura.numero}</strong> por un total de{" "}
            <strong>${factura.total.toFixed(2)}</strong>.
          </p>

          {/* Confirmación del envío por correo (aparece tras enviar) */}
          {enviado && (
            <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm text-green-700">
              📧 Factura enviada al correo <strong>{factura.cliente.email}</strong>
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={handleEnviarCorreo}
              disabled={enviado}
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
            >
              {enviado ? "Factura enviada ✓" : "Enviar factura por correo"}
            </button>
            <button
              onClick={handleDescargar}
              className="rounded-lg border border-indigo-300 px-4 py-2.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-50"
            >
              Descargar factura
            </button>
            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Si NO hay sesión: pedir iniciar sesión ---
  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center sm:px-6">
        <div className="rounded-xl border border-slate-200 bg-white p-8">
          <p className="text-slate-600">
            Debes iniciar sesión para completar tu compra.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  // --- Si el carrito está vacío ---
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center sm:px-6">
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8">
          <p className="text-slate-500">No tienes productos para comprar.</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    );
  }

  // --- Resumen de compra ---
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
        Resumen de compra
      </h1>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        {/* Datos del cliente */}
        <div className="mb-4 border-b border-slate-100 pb-4 text-sm text-slate-600">
          <p>
            <span className="font-medium">Cliente:</span> {user.name}
          </p>
          <p>
            <span className="font-medium">Correo:</span> {user.email}
          </p>
        </div>

        {/* Lista de productos */}
        <ul className="divide-y divide-slate-100">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-3 text-sm"
            >
              <span className="text-slate-700">
                {item.name} × {item.quantity}
              </span>
              <span className="font-medium text-slate-900">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        {/* Total */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-lg">
          <span className="font-medium text-slate-600">Total</span>
          <span className="font-bold text-slate-900">${total.toFixed(2)}</span>
        </div>

        <button
          onClick={handleComprar}
          className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Confirmar compra y generar factura
        </button>
      </div>
    </div>
  );
}
