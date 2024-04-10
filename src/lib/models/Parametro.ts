import { cadastroParametroSchema, listagemParametroSchema } from "@lib/validations/parametro/cadastroParametroSchema";
import zod from 'zod';

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
    parametros: ParametroListagem[];
    pagina: number;
    tamanhoPagina: number;
    quantidadePaginas: number;
}

export type ListagemParametroSchema = zod.infer<typeof listagemParametroSchema>;

export type CadastroParametroSchema = zod.infer<typeof cadastroParametroSchema>;