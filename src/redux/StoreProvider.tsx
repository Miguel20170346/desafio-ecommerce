"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./store";
import { setCarrito } from "./cartSlice";
import { iniciarSesion } from "./authSlice";

// Claves con las que guardamos datos en el navegador.
const CART_KEY = "novashop_cart";
const SESSION_KEY = "novashop_session";

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

    // 1) HIDRATAR: al cargar la página, recuperamos el carrito y la sesión
    //    guardados en localStorage y los metemos al estado global.
    try {
      const carrito = localStorage.getItem(CART_KEY);
      if (carrito) store.dispatch(setCarrito(JSON.parse(carrito)));

      const sesion = localStorage.getItem(SESSION_KEY);
      if (sesion) store.dispatch(iniciarSesion(JSON.parse(sesion)));
    } catch {
      // Si algún dato está corrupto, lo ignoramos.
    }

    // 2) PERSISTIR: cada vez que el estado cambia, guardamos carrito y sesión.
    const unsubscribe = store.subscribe(() => {
      const estado = store.getState();
      localStorage.setItem(CART_KEY, JSON.stringify(estado.cart.items));

      if (estado.auth.user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(estado.auth.user));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    });

    return () => unsubscribe();
  }, []);

  // Envolvemos la app con el Provider de Redux.
  return <Provider store={storeRef.current}>{children}</Provider>;
}
