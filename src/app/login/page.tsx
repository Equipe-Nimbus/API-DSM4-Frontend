import { Button } from "@components/Button";
import Input from "@components/Input";
import Image from "next/image";
import { AiOutlineRight } from "react-icons/ai";

export default function Login() {
    return (
        <>
        <div className="w-full min-h-screen flex justify-center items-center gap-40">
            <Image src="/svg-login.svg" alt="Ilustração de login" width={500} height={362}/>
            <div className="flex flex-col gap-4 w-1/4">
                <h1 className="text-xl font-rgular text-text-on-background">Bem-vindo(a) de volta</h1>
                <form className="flex flex-col gap-4">
                    <Input width="w-full" label="Email" />
                    <Input width="w-full" label="Senha" />
                    <Button text="Entrar" variant="primary" Icon={AiOutlineRight} iconPosition="right"/>
                </form>
            </div>
        </div>
        </>
    )
}