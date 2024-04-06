import { cadastroParametroSchema, listagemParametroSchema } from "@lib/validations/parametro/cadastroParametroSchema";
import zod from 'zod';

export type ListagemParametroSchema = zod.infer<typeof listagemParametroSchema>;

export type CadastroParametroSchema = zod.infer<typeof cadastroParametroSchema>;