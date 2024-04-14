import axios from "axios";

const apiViaCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export default apiViaCep;