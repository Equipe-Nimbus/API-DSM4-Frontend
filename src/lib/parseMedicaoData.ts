import { MedicaoFromServer, MedicaoRelatorio } from "./models/Medicao";

export function parseMedicaoArrayFromServer(medicoes: MedicaoFromServer[]): MedicaoRelatorio[] {
    return medicoes.map((medicao) => {
        return {
            idMedicao: medicao.medicao_idMedicao,
            dataMedicao: new Date(medicao.medicao_unixTime * 1000).toLocaleString(),
            valorMedicao: Number(medicao.medicao_valorMedida),
            nomeTipoParametro: medicao.tiposParametro_nomeTipoParametro,
            unidadeTipoParametro: medicao.tiposParametro_unidadeTipoParametro
        }
    })
}