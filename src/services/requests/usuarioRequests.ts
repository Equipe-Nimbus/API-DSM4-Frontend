import { UsuarioListagemGetOutput, UsuarioListagemGetParams } from "@lib/models/Usuario";
import { CadastroUsuarioSchema } from "@lib/validations/usuario/cadastroUsuarioSchema";
import api from "@services/api";
import { AxiosResponse } from "axios";

class UsuarioRequests {
    
    async get({pagina, tamanhoPagina, nome = '', email = ''}: UsuarioListagemGetParams ): Promise<AxiosResponse<UsuarioListagemGetOutput>> {
        const response = await api.get(`/usuario/listarGeral/paginada?pagina=${pagina}&tamanhoPagina=${tamanhoPagina}&nome=${nome}&email=${email}`);
        return response;
    } 

    async create(body: CadastroUsuarioSchema): Promise<AxiosResponse> {
        const Response = await api.post("/usuario/cadastrar", body);
        return Response;
    }
}

const usuarioRequests = new UsuarioRequests();
export default usuarioRequests;