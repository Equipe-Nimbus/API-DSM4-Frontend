import { cadastroParametroSchema} from "@lib/validations/parametro/cadastroParametroSchema";
import { listagemParametroSchema} from "@lib/validations/parametro/listagemParametroSchema";
import zod from 'zod';

export type ListagemParametroSchema = zod.infer<typeof listagemParametroSchema>;

export type CadastroParametroSchema = zod.infer<typeof cadastroParametroSchema>;