import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Atajos tipados para usar Redux en los componentes:

// useAppDispatch: para ENVIAR acciones (ej. dispatch(addToCart(producto)))
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// useAppSelector: para LEER el estado global (ej. state.cart.items)
export const useAppSelector = useSelector.withTypes<RootState>();
