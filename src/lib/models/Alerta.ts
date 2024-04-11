import { cadastroAlertaSchema } from '@lib/validations/alerta/cadastroAlertaSchema';
import zod from 'zod';

export type CadastroAlertaSchema = zod.infer<typeof cadastroAlertaSchema>;