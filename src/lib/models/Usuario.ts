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