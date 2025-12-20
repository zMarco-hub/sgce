export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  usuario: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
  };
}

export interface DecodedToken {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  exp: number;
  iat: number;
}
