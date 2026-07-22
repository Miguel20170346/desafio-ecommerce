import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Autorizamos los dominios externos desde donde next/image puede cargar imágenes.
    // Sin esto, Next.js bloquea las imágenes de internet por seguridad.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
    ],
  },
};

export default nextConfig;
