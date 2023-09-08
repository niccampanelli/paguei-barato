import { TiposMascara } from "../components/Input";
import Formatador from "./Formatador";

const mascarasInput: TiposMascara = {

    cep: {
        aplicar: (valor: string) => {
            return valor.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 9);
        },
        remover: (valor: string) => {
            return valor.replace(/\D/g, '');
        }
    },

    dinheiro: {
        aplicar: (valor: string) => {
            return Formatador.formatarMoeda(
                Number(valor.replace(/\D/g, '')) / 100
            );
        },
        remover: (valor: string) => {
            return (Number(valor.replace(/\D/g, '')) / 100).toString();
        }
    }
};

export default mascarasInput;