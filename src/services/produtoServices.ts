import api from "./api";

const produtoServices = {
    getProdutos: async () => {
        return await api.get('/produto');
    }
}

export default produtoServices;