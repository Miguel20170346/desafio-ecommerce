"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { iniciarSesion } from "@/redux/authSlice";
import { validarCredenciales } from "@/lib/auth";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});

  const validar = () => {
    const e: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Correo no válido";
    if (!password) e.password = "La contraseña es obligatoria";
    return e;
  };

  const handleSubmit = (evento: React.FormEvent) => {
    evento.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) return;

    // Verificamos email + contraseña contra los usuarios registrados.
    const usuario = validarCredenciales(email, password);
    if (!usuario) {
      toast.error("Correo o contraseña incorrectos");
      return;
    }

    // Credenciales correctas: iniciamos sesión y redirigimos al inicio.
    dispatch(iniciarSesion({ name: usuario.name, email: usuario.email }));
    toast.success(`¡Hola de nuevo, ${usuario.name}!`);
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="mb-6 text-center text-2xl font-bold tracking-tight">
        Iniciar sesión
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        noValidate
      >
        {/* Correo */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="correo@ejemplo.com"
          />
          {errores.email && (
            <p className="mt-1 text-sm text-red-600">{errores.email}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="Tu contraseña"
          />
          {errores.password && (
            <p className="mt-1 text-sm text-red-600">{errores.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Entrar
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        ¿No tienes cuenta?{" "}
        <Link
          href="/register"
          className="font-medium text-indigo-600 hover:underline"
        >
          Regístrate
        </Link>
      </p>
    </div>
  );
}
