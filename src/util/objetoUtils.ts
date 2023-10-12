import Formatador from "./Formatador";

const objetoUtils = {

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

    obterChavesComoArray: <T>(objeto: T) => {
        return Object.keys(objeto as object) as Array<keyof T>;
    },

    obterChavesUnicasComoArray: <T>(dados: T[]) => {
        const chaves = dados.map((valor) => Object.keys(valor as object));
        return Array.from(new Set(chaves.flat()));
    },

    obterValoresDePropriedade: <T>(dados: T[], propriedade: keyof T) => {
        return dados.map((valor) => valor[propriedade]);
    }
};

export default objetoUtils;