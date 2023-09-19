import { AxiosResponse } from "axios";
import API from "./api";
import ResultadoGeoCode from "../interfaces/models/ResultadoGeoCode";

interface SearchParams {
    consulta: string,
}

const mapaServices = {
    async search({ consulta }: SearchParams): Promise<AxiosResponse<ResultadoGeoCode>> {
        const api = await API.obterInstanciaAzureMaps();

        const res = await api.get<ResultadoGeoCode>("/", {
            params: {
                query: consulta,
            }
        });

        return res;
    },
}

export default mapaServices;