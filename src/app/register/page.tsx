"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { iniciarSesion } from "@/redux/authSlice";
import { registrarUsuario } from "@/lib/auth";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Un estado por cada campo del formulario.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  // Guardamos los mensajes de error por campo.
  const [errores, setErrores] = useState<Record<string, string>>({});

  // Valida todos los campos y devuelve un objeto con los errores encontrados.
  const validar = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "El nombre es obligatorio";
    // Expresión regular simple para el formato de correo.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Correo no válido";
    if (password.length < 6)
      e.password = "La contraseña debe tener al menos 6 caracteres";
    if (confirm !== password) e.confirm = "Las contraseñas no coinciden";
    return e;
  };

  const handleSubmit = (evento: React.FormEvent) => {
    evento.preventDefault(); // evita que la página se recargue
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) return; // hay errores: no continúa

    // Intentamos registrar el usuario en la "base de datos" (localStorage).
    const resultado = registrarUsuario({ name, email, password });
    if (!resultado.ok) {
      toast.error(resultado.error);
      return;
    }

    // Registro exitoso: iniciamos sesión y redirigimos al inicio.
    dispatch(iniciarSesion({ name, email }));
    toast.success(`¡Bienvenido, ${name}!`);
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="mb-6 text-center text-2xl font-bold tracking-tight">
        Crear cuenta
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        noValidate
      >
        {/* Nombre */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Nombre
          </label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="Tu nombre"
          />
          {errores.name && (
            <p className="mt-1 text-sm text-red-600">{errores.name}</p>
          )}
        </div>

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
            placeholder="Mínimo 6 caracteres"
          />
          {errores.password && (
            <p className="mt-1 text-sm text-red-600">{errores.password}</p>
          )}
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Confirmar contraseña
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(ev) => setConfirm(ev.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="Repite la contraseña"
          />
          {errores.confirm && (
            <p className="mt-1 text-sm text-red-600">{errores.confirm}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Registrarme
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-medium text-indigo-600 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
