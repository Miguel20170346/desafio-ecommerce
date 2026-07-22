import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "@/types";

// Forma del estado del carrito: una lista de ítems (producto + cantidad).
interface CartState {
  items: CartItem[];
}

// Estado inicial: el carrito arranca vacío.
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Agregar un producto. Si ya está en el carrito, solo suma 1 a la cantidad.
    addToCart: (state, action: PayloadAction<Product>) => {
      const existente = state.items.find((i) => i.id === action.payload.id);
      if (existente) {
        existente.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // Incrementar en 1 la cantidad de un producto (por su id).
    incrementar: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    // Decrementar en 1. Si la cantidad llega a 0, se elimina del carrito.
    decrementar: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },

    // Eliminar por completo un producto del carrito (por su id).
    eliminar: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    // Vaciar todo el carrito (lo usaremos tras finalizar la compra).
    vaciarCarrito: (state) => {
      state.items = [];
    },

    // Reemplazar el carrito completo. Sirve para "hidratar" desde localStorage.
    setCarrito: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

// Exportamos las acciones para despacharlas desde los componentes.
export const {
  addToCart,
  incrementar,
  decrementar,
  eliminar,
  vaciarCarrito,
  setCarrito,
} = cartSlice.actions;

// Exportamos el reducer para registrarlo en el store.
export default cartSlice.reducer;
