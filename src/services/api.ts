import axios from "axios";
import { ENDERECO_API } from "@env";

export default axios.create({
    baseURL: ENDERECO_API
});