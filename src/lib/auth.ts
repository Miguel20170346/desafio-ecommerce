// "Base de datos" simulada de usuarios, guardada en localStorage.
// NOTA: en una app real las contraseñas nunca se guardan así (se cifran en un
// servidor). Aquí es una simulación con fines académicos, como permite el PDF.

export interface StoredUser {
  name: string;
  email: string;
  password: string;
}

const USERS_KEY = "novashop_users";

// Lee la lista de usuarios registrados.
export function getUsuarios(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? (JSON.parse(data) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

// Registra un usuario nuevo. Devuelve un error si el correo ya existe.
export function registrarUsuario(
  nuevo: StoredUser
): { ok: boolean; error?: string } {
  const usuarios = getUsuarios();

  const existe = usuarios.some(
    (u) => u.email.toLowerCase() === nuevo.email.toLowerCase()
  );
  if (existe) {
    return { ok: false, error: "Ese correo ya está registrado" };
  }

  usuarios.push(nuevo);
  localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
  return { ok: true };
}

// Valida email + contraseña. Devuelve el usuario si coinciden, o null si no.
export function validarCredenciales(
  email: string,
  password: string
): StoredUser | null {
  const usuarios = getUsuarios();
  const encontrado = usuarios.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return encontrado ?? null;
}
