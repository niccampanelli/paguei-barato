import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useEstiloGlobal } from "../../estiloGlobal";
import BotaoProps from "../../interfaces/components/BotaoProps";
import Texto from "../Texto";

export default function Botao({
    titulo,
    icone,
    tipo = "principal",
    tamanho = "grande",
    tituloPeso = (tipo === "principal" ? "800ExtraBold" : "700Bold"),
    tituloItalico = false,
    subtitulo,
    subtituloPeso = "700Bold",
    subtituloItalico = false,
    style,
    disabled,
    ...props
}: BotaoProps) {

    const { estiloGlobal } = useEstiloGlobal();

    const estilos = {
        principal: {
            normal: {
                fundo: estiloGlobal.botaoPrincipal,
                texto: estiloGlobal.botaoPrincipalTexto,
            },
            grande: {
                fundo: estiloGlobal.botaoPrincipalGrande,
                texto: estiloGlobal.botaoPrincipalGrandeTexto,
                icone: estiloGlobal.botaoPrincipalGrandeIcone,
            }
        },
        secundario: {
            normal: {
                fundo: estiloGlobal.botaoSecundario,
                texto: estiloGlobal.botaoSecundarioTexto,
            },
            grande: {
                fundo: estiloGlobal.botaoSecundarioGrande,
                texto: estiloGlobal.botaoSecundarioGrandeTexto,
                icone: estiloGlobal.botaoSecundarioGrandeIcone,
            }
        }
    }

    return (
        <TouchableOpacity
            style={[
                (disabled ?
                    estilos["secundario"][tamanho].fundo
                    :
                    estilos[tipo][tamanho].fundo
                ),
                style
            ]}
            disabled={disabled}
            {...props}
        >
            <Texto
                peso={tituloPeso}
                italico={tituloItalico}
                style={[
                    (disabled ?
                        estilos["secundario"][tamanho].texto
                        :
                        estilos[tipo][tamanho].texto    
                    ),
                    (disabled &&
                        { opacity: 0.25 }
                    )
                ]}
            >
                {titulo}
            </Texto>
            <View style={estiloGlobal.botaoContainerDireita}>
                {subtitulo &&
                    <Texto
                        peso={subtituloPeso}
                        italico={subtituloItalico}
                        style={[
                            (disabled ?
                                estilos["secundario"][tamanho].texto
                                :
                                estilos[tipo][tamanho].texto    
                            ),
                            (disabled &&
                                { opacity: 0.25 }
                            )
                        ]}
                    >
                        {subtitulo}
                    </Texto>
                }
                {(icone && tamanho === "grande") &&
                    <Feather
                        name={icone}
                        style={[
                            (disabled ?
                                estilos["secundario"][tamanho].texto
                                :
                                estilos[tipo][tamanho].texto    
                            ),
                            (disabled &&
                                { opacity: 0.25 }
                            )
                        ]}
                    />
                }
            </View>
        </TouchableOpacity>
    );
}