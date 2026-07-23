import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Datos del usuario en sesión (sin la contraseña, que nunca se guarda en el estado).
export interface AuthUser {
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null; // null = nadie ha iniciado sesión
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Inicia sesión: guarda al usuario actual en el estado global.
    iniciarSesion: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
    // Cierra sesión: limpia el usuario.
    cerrarSesion: (state) => {
      state.user = null;
    },
  },
});

export const { iniciarSesion, cerrarSesion } = authSlice.actions;
export default authSlice.reducer;
