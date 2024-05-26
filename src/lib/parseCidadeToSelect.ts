import { Option } from "@components/Select";

export function parseCidadesToSelect(cidades: any[]): Option[] {
    return cidades.map((cidade) => ({
        value: cidade.nome,
        label: cidade.nome
    }))
};