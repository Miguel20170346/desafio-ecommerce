"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./store";
import { setCarrito } from "./cartSlice";

// Clave con la que guardamos el carrito en el navegador.
const STORAGE_KEY = "novashop_cart";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useRef guarda el store para crearlo UNA sola vez (no en cada render).
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    // 1) HIDRATAR: al cargar la página, leemos el carrito guardado
    //    en localStorage y lo metemos al estado global.
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado) {
      try {
        store.dispatch(setCarrito(JSON.parse(guardado)));
      } catch {
        // Si el dato está corrupto, lo ignoramos.
      }
    }

    // 2) PERSISTIR: nos suscribimos a los cambios del store y, cada vez
    //    que el carrito cambia, lo guardamos en localStorage.
    const unsubscribe = store.subscribe(() => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(store.getState().cart.items)
      );
    });

    return () => unsubscribe();
  }, []);

  // Envolvemos la app con el Provider de Redux.
  return <Provider store={storeRef.current}>{children}</Provider>;
}
