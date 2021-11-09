// Generated by https://quicktype.io

// =============== Backend Interfaces
export interface LoginResponse {
  usuario: Usuario;
  token: string;
}

export interface Usuario {
  rol: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  correo: string;
  uid: string;
  img?: string;
}

export interface LoginData {
  correo: string;
  password: string;
}
export interface RegisterData {
  nombre: string;
  correo: string;
  password: string;
}

// Generated by https://quicktype.io

export interface ProductsResponse {
  total: number;
  productos: Producto[];
}

export interface Producto {
  precio: number;
  _id: string;
  nombre: string;
  categoria: Categoria;
  usuario: Categoria;
  img?: string;
}

export interface Categoria {
  _id: string;
  nombre: string;
}

// =============== State Interfaces

export type Status = 'checking' | 'authenticated' | 'not-authenticated';

export interface AuthContextProps {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: Status;
  signUp: (registerData: RegisterData) => void;
  signIn: (loginData: LoginData) => void;
  removeError: () => void;
  logOut: () => void;
}
export interface AuthState {
  status: Status;
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

// =============== App Interfaces
export interface IChildrenAsProps {
  children: JSX.Element | JSX.Element[];
}
