import Formatador from "./Formatador";

const buscaObjeto = {

    corresponder: (dados: any[], termo: string) => {
        return dados.filter((valor) => {
            return Formatador.removerDiacriticos(valor)
                .toLowerCase()
                .includes(
                    Formatador.removerDiacriticos(termo)
                        .toLowerCase()
                );
        });
    },
};

export default buscaObjeto;