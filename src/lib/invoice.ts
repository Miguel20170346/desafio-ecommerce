import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Invoice } from "@/types";

// Construye un documento PDF de la factura y lo devuelve.
// (No lo descarga aquí; eso lo decide quien llama a la función.)
export function generarFacturaPDF(factura: Invoice): jsPDF {
  const doc = new jsPDF();

  // --- Encabezado ---
  doc.setFontSize(22);
  doc.setTextColor(79, 70, 229); // color indigo de la marca
  doc.text("NovaShop", 14, 20);

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text("Factura de compra", 14, 27);

  // --- Datos de la factura y del cliente ---
  doc.setTextColor(0);
  doc.setFontSize(10);
  doc.text(`Factura N°: ${factura.numero}`, 14, 40);
  doc.text(`Fecha: ${factura.fecha}`, 14, 46);
  doc.text(`Cliente: ${factura.cliente.name}`, 14, 52);
  doc.text(`Correo: ${factura.cliente.email}`, 14, 58);

  // --- Tabla de productos ---
  autoTable(doc, {
    startY: 66,
    head: [["Producto", "Cantidad", "Precio unit.", "Subtotal"]],
    body: factura.items.map((item) => [
      item.name,
      String(item.quantity),
      `$${item.price.toFixed(2)}`,
      `$${(item.price * item.quantity).toFixed(2)}`,
    ]),
    headStyles: { fillColor: [79, 70, 229] }, // encabezado indigo
    styles: { fontSize: 10 },
  });

  // --- Total (debajo de la tabla) ---
  // lastAutoTable.finalY nos da la posición Y donde terminó la tabla.
  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } })
    .lastAutoTable.finalY;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(`Total: $${factura.total.toFixed(2)}`, 14, finalY + 12);

  // --- Pie de página ---
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(
    "Gracias por tu compra en NovaShop.",
    14,
    finalY + 24
  );

  return doc;
}

// Genera un número de factura simple basado en la fecha/hora actual.
export function generarNumeroFactura(): string {
  const ahora = new Date();
  const sello = ahora.getTime().toString().slice(-8);
  return `NOVA-${sello}`;
}
