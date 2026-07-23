// Categorías disponibles en el catálogo.
// Usamos un "union type" para que TypeScript solo permita estos valores.
export type Category =
  | "Electrónica"
  | "Ropa"
  | "Hogar"
  | "Deportes"
  | "Libros";

// Estructura de un producto del catálogo.
// Esta interface tipa cada objeto del archivo products.json.
export interface Product {
  id: number;
  name: string;
  description: string; // descripción técnica del producto
  price: number; // precio en dólares (USD)
  category: Category;
  image: string; // URL de la imagen del producto
  stock: number; // unidades disponibles
}

// Un ítem dentro del carrito: un producto + la cantidad elegida.
export interface CartItem extends Product {
  quantity: number;
}

// Datos de una factura generada tras la compra.
export interface Invoice {
  numero: string; // número/identificador de la factura
  fecha: string; // fecha de emisión (texto legible)
  cliente: { name: string; email: string };
  items: CartItem[]; // productos comprados
  total: number; // total pagado
}
