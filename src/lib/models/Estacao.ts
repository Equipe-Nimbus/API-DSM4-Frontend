import { cadastroEstacaoSchema } from '@lib/validations/estacao/cadastroEstacaoSchema';
import zod from 'zod';
import { ListagemParametroSchema } from './Parametro';

export interface Estacao {
    idEstacao: number;
    nomeEstacao: string;
    cepEstacao: string;
    ruaAvenidaEstacao: string;
    numeroEnderecoEstacao: string;
    cidadeEstacao: string;
    bairroEstacao: string;
    estadoEstacao: string;
    latitudeEstacao: number;
    longitudeEstacao: number;
    tipoParametros: Array<ListagemParametroSchema>
}
export interface EstacaoListagem {
    idEstacao: number;
    nomeEstacao: string;
    cepEstacao: string;
}

export type CadastroEstacaoSchema = zod.infer<typeof cadastroEstacaoSchema>;

export interface EstacaoListagemGetParams {
    pagina: number;
    tamanhoPagina: number;
    nome?: string;
    cep?: string;
}

export interface EstacaoListagemGetOutput {
    estacoes: EstacaoListagem[];
    pagina: number;
    tamanhoPagina: number;
    quantidadePaginas: number;
}

export interface EstacaoAtualizacao extends CadastroEstacaoSchema {
    idEstacao: number;
}

export interface EstacaoSelect {
    idEstacao: number;
    nomeEstacao: string;
}