import { StyleSheet } from "react-native";
import { useTemaContext } from "./util/context/providers/temaProvider";

export const useEstiloGlobal = () => {

    const { propriedadesTema } = useTemaContext();
    const estiloGlobal = StyleSheet.create({

        titulo: {
            color: propriedadesTema.cores.textoEscuro,
            fontSize: propriedadesTema.tamanhoTextos.titulo,
            fontWeight: "bold",
        },
        
        subtitulo: {
            color: propriedadesTema.cores.textoEscuro,
            fontSize: propriedadesTema.tamanhoTextos.subtitulo,
            fontWeight: "bold",
        },
    
        texto: {
            color: propriedadesTema.cores.textoEscuro,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            fontWeight: "400",
        },
    
        label: {
            color: propriedadesTema.cores.textoEscuro,
            fontSize: propriedadesTema.tamanhoTextos.texto,
            fontWeight: "700",
        },
    
        observacao: {
            color: propriedadesTema.cores.textoClaro,
            fontSize: propriedadesTema.tamanhoTextos.observacao,
            fontWeight: "400"
        },
    
        input: {
            flexDirection: "row",
            alignItems: "center",
            borderRadius: propriedadesTema.layout.raioBorda,
            backgroundColor: propriedadesTema.cores.fundoSecundario,
            paddingVertical: propriedadesTema.botoesGrandes.paddingVertical,
            paddingHorizontal: propriedadesTema.botoesGrandes.paddingHorizontal
        },
    
        inputIcone: {
            fontSize: propriedadesTema.botoesGrandes.texto,
            color: propriedadesTema.cores.secundaria
        },
    
        inputCampo: {
            fontSize: propriedadesTema.botoesGrandes.texto,
            marginLeft: propriedadesTema.botoesGrandes.espacamento,
            height: "100%",
            width: "100%"
        },
    
        botaoPrincipal: {
            backgroundColor: propriedadesTema.cores.destaque,
            borderRadius: propriedadesTema.layout.raioBorda,
            paddingVertical: propriedadesTema.botoes.paddingVertical,
            paddingHorizontal: propriedadesTema.botoes.paddingHorizontal
        },
    
        botaoPrincipalTexto: {
            fontSize: propriedadesTema.botoes.texto,
            fontWeight: "700",
            color: "#000000"
        },
    
        botaoSecundario: {
            backgroundColor: propriedadesTema.cores.fundoSecundario,
            borderRadius: propriedadesTema.layout.raioBorda,
            paddingVertical: propriedadesTema.botoes.paddingVertical,
            paddingHorizontal: propriedadesTema.botoes.paddingHorizontal
        },
    
        botaoSecundarioTexto: {
            fontSize: propriedadesTema.botoes.texto,
            fontWeight: "700",
            color: propriedadesTema.cores.textoEscuro
        },
    
        botaoPrincipalGrande: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: propriedadesTema.cores.destaque,
            borderRadius: propriedadesTema.layout.raioBorda,
            paddingVertical: propriedadesTema.botoesGrandes.paddingVertical,
            paddingHorizontal: propriedadesTema.botoesGrandes.paddingHorizontal
        },
    
        botaoPrincipalGrandeTexto: {
            fontSize: propriedadesTema.botoesGrandes.texto,
            fontWeight: "700",
            color: "#000000"
        },
    
        botaoPrincipalGrandeIcone: {
            fontSize: propriedadesTema.botoesGrandes.texto,
            color: propriedadesTema.cores.textoEscuro
        },
    
        botaoSecundarioGrande: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: propriedadesTema.cores.fundoSecundario,
            borderRadius: propriedadesTema.layout.raioBorda,
            paddingVertical: propriedadesTema.botoesGrandes.paddingVertical,
            paddingHorizontal: propriedadesTema.botoesGrandes.paddingHorizontal
        },
    
        botaoSecundarioGrandeTexto: {
            fontSize: propriedadesTema.botoesGrandes.texto,
            fontWeight: "700",
            color: propriedadesTema.cores.textoEscuro
        },
    
        botaoSecundarioGrandeIcone: {
            fontSize: propriedadesTema.botoesGrandes.texto,
            color: propriedadesTema.cores.textoEscuro
        },
    
        tagPequenaNormal: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: propriedadesTema.cores.fundoSecundario,
            borderRadius: propriedadesTema.layout.raioBorda,
            paddingVertical: propriedadesTema.botoes.paddingVertical,
            paddingHorizontal: propriedadesTema.botoes.paddingHorizontal
        },
    
        tagPequenaNormalTexto: {
            fontSize: propriedadesTema.botoes.texto,
            fontWeight: "400",
            color: propriedadesTema.cores.textoEscuro
        },
    
        tagPequenaDestaque: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: propriedadesTema.cores.destaque,
            borderRadius: propriedadesTema.layout.raioBorda,
            paddingVertical: propriedadesTema.botoes.paddingVertical,
            paddingHorizontal: propriedadesTema.botoes.paddingHorizontal
        },
    
        tagPequenaDestaqueTexto: {
            fontSize: propriedadesTema.botoes.texto,
            fontWeight: "400",
            color: "#000000"
        },
    
        tagPequenaSecundaria: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: propriedadesTema.cores.secundaria,
            borderRadius: propriedadesTema.layout.raioBorda,
            paddingVertical: propriedadesTema.botoes.paddingVertical,
            paddingHorizontal: propriedadesTema.botoes.paddingHorizontal
        },
    
        tagPequenaSecundariaTexto: {
            fontSize: propriedadesTema.botoes.texto,
            fontWeight: "400",
            color: "#ffffff"
        },
    
        tagPequenaEscura: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: propriedadesTema.cores.fundoTerciario,
            borderRadius: propriedadesTema.layout.raioBorda,
            paddingVertical: propriedadesTema.botoes.paddingVertical,
            paddingHorizontal: propriedadesTema.botoes.paddingHorizontal
        },
    
        tagPequenaEscuraTexto: {
            fontSize: propriedadesTema.botoes.texto,
            fontWeight: "400",
            color: propriedadesTema.cores.textoEscuro
        },
    
        modalCard: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            paddingTop: propriedadesTema.modal.paddingTop,
            paddingBottom: propriedadesTema.modal.paddingBottom,
            paddingHorizontal: propriedadesTema.modal.paddingHorizontal
        },
    
        modalHandle: {
            backgroundColor: propriedadesTema.cores.fundoTerciario,
            marginVertical: propriedadesTema.modal.paddingVerticalHandle,
            width: propriedadesTema.modal.larguraHandle,
            height: propriedadesTema.modal.alturaHandle
        },
    
        modalTitulo: {
            marginBottom: 16
        },
    
        modalOpcoes: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 16
        },
    
        modalOpcaoSecundaria: {
            flex: 1,
            marginLeft: 16
        }
    });

    return { estiloGlobal };
}