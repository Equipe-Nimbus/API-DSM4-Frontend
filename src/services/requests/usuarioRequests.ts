import { CadastroUsuarioSchema } from "@lib/validations/usuario/cadastroUsuarioSchema";
import api from "@services/api";
import { AxiosResponse } from "axios";

class UsuarioRequests {
    async create(body: CadastroUsuarioSchema): Promise<AxiosResponse> {
        const response = await api.post("/usuario/cadastrar", body)
        return response
    }
}

const usuarioRequests = new UsuarioRequests()
export default usuarioRequests;