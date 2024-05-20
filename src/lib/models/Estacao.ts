import { cadastroEstacaoSchema } from '@lib/validations/estacao/cadastroEstacaoSchema';
import zod from 'zod';
import { ListagemParametroSchema } from './Parametro';

export interface Estacao {
    idEstacao: string;
    idPlacaEstacao: string;
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
    idEstacao: string;
    nomeEstacao: string;
    cidadeEstacao: string;
    bairroEstacao: string;
    ruaAvenidaEstacao: string;
}

export interface EstacaoListagemPublic {
    idEstacao: string;
    nomeEstacao: string;
    ruaAvenidaEstacao: string;
    numeroEnderecoEstacao: string;
    bairroEstacao: string;
    cidadeEstacao: string;
    estadoEstacao: string;
    latitudeEstacao: number;
    longitudeEstacao: number;
}

export type CadastroEstacaoSchema = zod.infer<typeof cadastroEstacaoSchema>;

export interface EstacaoListagemGetParams {
    pagina: number;
    tamanhoPagina: number;
    nome?: string;
    cidade?: string;
    bairro?: string;
    endereco?: string;
    avenida?: string;
}

export interface EstacaoListagemGetOutput {
    estacoes: EstacaoListagem[];
    pagina: number;
    tamanhoPagina: number;
    quantidadePaginas: number;
}

export interface EstacaoAtualizacao extends CadastroEstacaoSchema {
    idEstacao: string;
}

export interface EstacaoSelect {
    idEstacao: number;
    nomeEstacao: string;
}