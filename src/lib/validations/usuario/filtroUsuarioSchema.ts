import zod from "zod";

const filtroUsuarioSchema = zod.object({
    nome: zod.
        string().
        max(255, { message: 'Máximo de caracteres é 255' }).
        optional(),
    email: zod.
        string().
        max(255, { message: 'Máximo de caracteres é 255' }).
        optional(),
});

type FiltroUsuarioSchema = zod.infer<typeof filtroUsuarioSchema>;

export { filtroUsuarioSchema };
export type { FiltroUsuarioSchema };