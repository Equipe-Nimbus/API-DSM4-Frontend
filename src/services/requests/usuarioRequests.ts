import { Usuario, UsuarioAtualizacao, UsuarioListagemGetOutput, UsuarioListagemGetParams, UsuarioLoginOutput, UsuarioLoginSchema } from "@lib/models/Usuario";
import { CadastroUsuarioSchema } from "@lib/models/Usuario";
import api from "@services/api";
import { AxiosResponse } from "axios";

class UsuarioRequests {
    
    async get({pagina, tamanhoPagina, nome = '', email = ''}: UsuarioListagemGetParams ): Promise<AxiosResponse<UsuarioListagemGetOutput>> {
        const response = await api.get(`/usuario/listarGeral/paginada?pagina=${pagina}&tamanhoPagina=${tamanhoPagina}&nome=${nome}&email=${email}`);
        return response;
    }
    
    async getById(id: number): Promise<AxiosResponse<Usuario>> {
        const response = await api.get(`/usuario/listarEspecifico/${id}`);
        return response;
    }

    async create(body: CadastroUsuarioSchema): Promise<AxiosResponse> {
        const Response = await api.post("/usuario/cadastrar", body);
        return Response;
    }

    async update(body: UsuarioAtualizacao): Promise<AxiosResponse> {
        const Response = await api.put("/usuario/atualizar", body);
        return Response;
    }

    async delete(id: number): Promise<AxiosResponse> {
        const response = await api.delete(`/usuario/deletar/${id}`);
        return response;
    }

    async login(body: UsuarioLoginSchema): Promise<AxiosResponse<UsuarioLoginOutput>> {
        const response = await api.post("/usuario/login", body)
        return response;
    }
}

const usuarioRequests = new UsuarioRequests();
export default usuarioRequests;