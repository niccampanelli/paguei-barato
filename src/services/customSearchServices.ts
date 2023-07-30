import { AxiosResponse } from "axios";
import API from "./api";
import ResultadoPesquisaImagens from "../interfaces/models/PesquisaImagens";

interface SearchParams {
    consulta: string,
    termosExatos: string,
    pagina?: number,
}

const customSearchServices = {
    async search({ consulta, termosExatos, pagina = 1 }: SearchParams): Promise<AxiosResponse<ResultadoPesquisaImagens>> {
        const api = await API.obterInstanciaCustomSearch();

        const res = await api.get<ResultadoPesquisaImagens>("/", {
            params: {
                q: consulta,
                exactTerms: termosExatos,
                num: 10,
                start: (pagina * 10) - 9,
            }
        });

        console.log(res);

        return res;
    },
}

export default customSearchServices;