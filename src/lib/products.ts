import data from "@/data/products.json";
import type { Category, Product } from "@/types";

// Importamos el JSON y lo tipamos como un arreglo de Product.
// Así, en todo el proyecto trabajamos con datos tipados y con autocompletado.
export const products: Product[] = data as Product[];

// Lista de categorías únicas presente en el catálogo.
// La usaremos para construir los botones de filtrado.
export const categories: Category[] = Array.from(
  new Set(products.map((p) => p.category))
);

// Busca un producto por su id (útil para la página de detalle o la factura).
export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
