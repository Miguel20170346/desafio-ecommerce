import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// makeStore crea una nueva "bodega" (store) con todos los slices registrados.
// La usamos como función para poder crear el store dentro del Provider (cliente).
export const makeStore = () => {
  return configureStore({
    reducer: {
      // Cada clave es una "sección" del estado global.
      // Aquí el carrito vivirá en state.cart
      cart: cartReducer,
    },
  });
};

// Tipos derivados automáticamente del store.
// Nos dan autocompletado y seguridad al leer/escribir el estado.
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
