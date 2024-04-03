import { cadastroUsuarioSchema } from '@lib/validations/usuario/cadastroUsuarioSchema';
import zod from 'zod';
export interface Usuario {
    idUsuario: number;
    nomeUsuario: string;
    emailUsuario: string;
    senhaUsuario: string;
    perfilUsuario: string;  
    cpfUsuario: string;
    dataNascimentoUsuario: string;
    cepUsuario: string;
    ruaAvenidaUsuario: string;
    numeroCasaUsuario: string;
    cidadeUsuario: string;
    bairroUsuario: string;
    estadoUsuario: string;
}
export interface UsuarioListagem {
    idUsuario: number;
    nomeUsuario: string;
    emailUsuario: string;
}

export interface UsuarioListagemGetParams {
    pagina: number;
    tamanhoPagina: number;
    nome?: string;
    email?: string;
}

export interface UsuarioListagemGetOutput {
    usuarios: UsuarioListagem[];
    pagina: number;
    tamanhoPagina: number;
    quantidadePaginas: number;
}

export type CadastroUsuarioSchema = zod.infer<typeof cadastroUsuarioSchema>;

export interface UsuarioAtualizacao extends Omit<CadastroUsuarioSchema, 'cpfUsuario'> {
    idUsuario: number;
}
