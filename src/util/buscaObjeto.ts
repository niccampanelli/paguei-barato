import Formatador from "./Formatador";

const buscaObjeto = {

    corresponder: (dados: any[], termo: string, extrairChave: (item: any) => string) => {
        return dados.filter((valor) => {
            return Formatador.removerDiacriticos(extrairChave(valor))
                .toLowerCase()
                .includes(
                    Formatador.removerDiacriticos(termo)
                        .toLowerCase()
                );
        });
    },
};

export default buscaObjeto;