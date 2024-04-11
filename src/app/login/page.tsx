'use client';
import Image from "next/image";
import { AiOutlineRight } from "react-icons/ai";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter} from "next/navigation";
import { Button } from "@components/Button";
import Input from "@components/Input";
import { loginUsuarioSchema } from "@lib/validations/usuario/loginUsuarioSchema";
import { UsuarioLoginSchema } from "@lib/models/Usuario";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { ToastContext } from "@contexts/ToastContext";

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<UsuarioLoginSchema>({
        resolver: zodResolver(loginUsuarioSchema)
    });
    const { signIn } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);
    const router = useRouter();

    async function handleLogin(data: UsuarioLoginSchema) {
        //console.log(data);
        const { email, senha } = data
        try {
            await signIn({ email, senha});
            router.push("/admin")
        } catch (error: any) {
            addToast({ visible: true, message: `Erro no login: ${error.response.data}`, type: 'error', position: 'bottom-left' });
        }
    }

    return (
        <>
            <div className="w-full min-h-screen flex justify-center items-center gap-40">
                <Image src="/svg-login.svg" alt="Ilustração de login" width={500} height={362} />
                <div className="flex flex-col gap-4 w-1/4">
                    <h1 className="text-xl font-rgular text-text-on-background">Bem-vindo(a) de volta</h1>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
                        <Input width="w-full" label="Email" {...register("email")} error={errors.email?.message} />
                        <Input width="w-full" label="Senha" type="password" {...register("senha")} error={errors.senha?.message} />
                        <Button text="Entrar" variant="primary" Icon={AiOutlineRight} iconPosition="right" />
                    </form>
                </div>
            </div>
        </>
    )
}