import zod from 'zod';
import { cadastroUsuarioSchema } from './cadastroUsuarioSchema';

export const atualizacaoUsuarioSchema = cadastroUsuarioSchema.deepPartial().extend({
    senhaUsuario: zod
        .string()
        .optional()
})