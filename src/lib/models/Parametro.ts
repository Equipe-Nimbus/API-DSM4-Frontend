import { cadastroParametroSchema } from "@lib/validations/parametro/cadastroParametroSchema";
import zod from 'zod';

export type CadastroParametroSchema = zod.infer<typeof cadastroParametroSchema>;