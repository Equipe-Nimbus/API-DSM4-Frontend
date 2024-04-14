'use client'
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { UsuarioLogado, UsuarioLoginSchema } from "@lib/models/Usuario";
import usuarioRequests from "@services/requests/usuarioRequests";
import api from "@services/api";
import { set } from "zod";

interface AuthContextData {
    signIn: (data: UsuarioLoginSchema) => Promise<void>;
    signOut: () => void;
    currentUser: UsuarioLogado | undefined;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UsuarioLogado | undefined>(undefined);

    useEffect(() => {
        const cookies = parseCookies(undefined);
        const loggedUser = cookies['loggedUser'];
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);

    async function signIn({ email, senha }: UsuarioLoginSchema) {
        try {
            const response = await usuarioRequests.login({ email, senha })
            const { token, usuario } = response.data;
            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 4, // 4 horas
                path: '/'
            })
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            setCookie(undefined, 'loggedUser', JSON.stringify(usuario), {
                maxAge: 60 * 60 * 4, // 4 horas
                path: '/'
            })
            setUser(usuario);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    function signOut() {
        setCookie(undefined, 'nextauth.token', '', {
            maxAge: -1,
            path: '/'
        });

        setCookie(undefined, 'loggedUser', '', {
            maxAge: -1,
            path: '/'
        });
        setUser(undefined);
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, currentUser: user }}>
            {children}
        </AuthContext.Provider>
    )
}