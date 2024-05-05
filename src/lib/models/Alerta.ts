import { cadastroAlertaSchema } from '@lib/validations/alerta/cadastroAlertaSchema';
import zod from 'zod';
import { EstacaoListagem } from './Estacao';
import { ParametroListagem } from './Parametro';

export interface Alerta {
    idAlerta: number;
    nomeAlerta: string;
    condicaoAlerta: string;
    valorMedicaoAlerta: number;
    idEstacao: string;
    idTipoParametro: number;
}

export type CadastroAlertaSchema = zod.infer<typeof cadastroAlertaSchema>;

export interface AlertaListagem {
    idAlerta: number;
    nomeAlerta: string;
    condicaoAlerta: string;
    valorMedicaoAlerta: number;
    estacao: EstacaoListagem;
    tipoParametro: ParametroListagem;
}
export interface AlertaListagemGetParams {
    pagina: number;
    tamanhoPagina: number;
    nome?: string;
}

export interface AlertaListagemGetOutput {
    alertas: AlertaListagem[];
    pagina: number;
    tamanhoPagina: number;
    quantidadePaginas: number;
}

export interface AlertasFromServer {
    idAlerta: number;
    nomeAlerta: string;
    condicaoAlerta: string;
    valorMedicaoAlerta: number;
    parametro: {
        estacoes: EstacaoListagem;
        __tiposParametro__: ParametroListagem;
    }
}

export interface AtualizacaoAlerta extends CadastroAlertaSchema {
    idAlerta: number;
}

export interface UltimosAlertasDashboard {
    alertas:
    {
        nomeAlerta: string;
        cidadeAlerta: string;
        estadoAlerta: string;
        dataMedida: string;
    }[]
}

export interface AlertasPorMes {
    totalAlertas: number,
    relacaoTipoParametro: {
        valorPorTipoParametro: number[],
        tipoParametros: string[]
    },
    relacaoEstado: {
        valorPorEstado: number[],
        estados: string[]
    }
}