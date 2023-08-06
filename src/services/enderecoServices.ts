import { AxiosResponse } from "axios";
import API from "./api";
import EnderecoViaCep from "../interfaces/models/EnderecoViaCep";

const enderecoServices = {
    async getEnderecoViaCep(cep: string): Promise<AxiosResponse<EnderecoViaCep>> {
        const api = await API.obterInstanciaViaCep();

        const cepFormatado = cep.replace(/\D/g, '');

        const data = await api.get<EnderecoViaCep>(`/${cepFormatado}/json`);
        return data;
    }
}

export default enderecoServices;