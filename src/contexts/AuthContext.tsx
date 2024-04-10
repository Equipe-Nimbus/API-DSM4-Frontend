'use client'
import { createContext } from "react";
import { setCookie } from "nookies";
import { UsuarioLoginSchema } from "@lib/models/Usuario";
import usuarioRequests from "@services/requests/usuarioRequests";
import api from "@services/api";

interface AuthContextData {
    isAuthenticated: boolean;
    signIn: (data: UsuarioLoginSchema) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    async function signIn({ email, senha }: UsuarioLoginSchema) {
        try {
            const response = await usuarioRequests.login({ email, senha })
            const { token } = response.data;
            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 4, // 4 horas
                path: '/'
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: true, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}