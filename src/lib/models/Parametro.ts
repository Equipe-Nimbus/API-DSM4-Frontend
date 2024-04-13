import { cadastroParametroSchema } from "@lib/validations/parametro/cadastroParametroSchema";
import { listagemParametroSchema } from "@lib/validations/parametro/listagemParametroSchema";
import zod from 'zod';

export interface Parametro {
    idTipoParametro: number;
    nomeTipoParametro: string;
    unidadeTipoParametro: string;
    fatorTipoParametro: number | undefined;
    offsetTipoParametro: number | undefined;
}

export interface ParametroListagem {
    idTipoParametro: number;
    nomeTipoParametro: string;
    unidadeTipoParametro: string;
    fatorTipoParametro: string;
    offsetTipoParametro: string;
}

export interface ParametroListagemGetParams {
    pagina: number;
    tamanhoPagina: number;
    nome?: string;
    unidade?: string;
    fator?: string;
    offset?: string
}

export interface ParametroListagemGetOutput {
    tiposParametros: ParametroListagem[];
    pagina: number;
    tamanhoPagina: number;
    quantidadePaginas: number;
}

export type ListagemParametroSchema = zod.infer<typeof listagemParametroSchema>;

export type CadastroParametroSchema = zod.infer<typeof cadastroParametroSchema>;

export interface ParametroAtualizacao extends CadastroParametroSchema {
    idTipoParametro: number;
}