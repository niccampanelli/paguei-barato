// import { NavigationProp, useNavigation } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { StatusBar } from "expo-status-bar";
// import { useEffect, useRef, useState } from "react";
// import { GestureResponderEvent, Image, KeyboardAvoidingView, View, TextInput } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { useEstiloGlobal } from "../../../estiloGlobal";
// import Input from "../../Input";
// import { useEstilos } from "./styles";
// import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";
// import { useTemaContext } from "../../../util/context/providers/temaProvider";
// import Texto from "../../Texto";
// import Botao from "../../Botao";
// import authServices from "../../../services/authServices";
// import UF from "../../../interfaces/models/UF";
// import Logo from "../../Logo";
// import { useAuthContext } from "../../../util/context/providers/authProvider";
// import enderecoServices from "../../../services/enderecoServices";
// import CarregandoOverlay from "../../CarregandoOverlay";
// import { useNotificacaoToast } from "../../../util/context/providers/notificacaoProvider";

// export default function Cadastro() {

//     const { estilos } = useEstilos();
//     const { estiloGlobal } = useEstiloGlobal();
//     const { cadastrarUsuario } = useAuthContext();

//     const FluxoCadastro = createNativeStackNavigator();
//     const { propriedadesTema, temaAtivo } = useTemaContext();

//     const [mostraBanner, setMostraBanner] = useState(true);

//     const navegarProximo = (nav: NavigationProp<any>, tela: string) => {
//         nav.navigate(tela as never);
//     }

//     const [dadosCadastro, setDadosCadastro] = useState({
//         nome: "",
//         sobrenome: "",
//         email: "",
//         senha: "",
//         senhaConfirma: "",
//         logradouro: "",
//         numero: 0,
//         complemento: "",
//         bairro: "",
//         cidade: "",
//         uf: "SP" as UF,
//         cep: ""
//     });

//     const enviarDadosCadastro = async () => {
//         try {
//             await cadastrarUsuario(dadosCadastro);
//         } catch (error) {
//             console.table(error);
//         }
//     };

//     const CadastroTela1 = ({ dados, setDados }: any) => {

//         const [nome, setNome] = useState<string>(dados.nome);
//         const cadastroNavigation = useNavigation();

//         const proximo = (e: GestureResponderEvent) => {
//             e.preventDefault();
//             navegarProximo(cadastroNavigation, "fluxoCadastro2");

//             setDados((dados: any) => (
//                 {
//                     ...dados,
//                     nome
//                 }
//             ));
//         };

//         return (
//             <KeyboardAvoidingView style={estilos.container}>
//                 <Logo style={estilos.logo} />
//                 <View style={estilos.cadastro}>
//                     <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Vamos nos conhecer melhor!</Texto>
//                     <View style={estilos.form}>
//                         <View style={estilos.grupoForm}>
//                             <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Para começar, nos diga seu primeiro nome:</Texto>
//                             <Input
//                                 icone={<Feather name="user" style={estiloGlobal.inputIcone} />}
//                                 returnKeyType="next"
//                                 onSubmitEditing={e => proximo(e as any)}
//                                 textContentType="name"
//                                 autoCapitalize="words"
//                                 autoCorrect={false}
//                                 placeholder="Informe seu primeiro nome"
//                                 value={nome}
//                                 onChangeText={setNome}
//                             />
//                         </View>
//                     </View>
//                 </View>
//                 <Botao titulo="Próxima etapa" icone="arrow-right" onPress={e => proximo(e)} />
//             </KeyboardAvoidingView>
//         );
//     };

//     const CadastroTela2 = ({ dados, setDados }: any) => {

//         const [sobrenome, setSobrenome] = useState<string>(dados.sobrenome);
//         const cadastroNavigation = useNavigation();

//         const proximo = (e: GestureResponderEvent) => {
//             e.preventDefault();
//             navegarProximo(cadastroNavigation, "fluxoCadastro3");

//             setDados((dados: any) => (
//                 {
//                     ...dados,
//                     sobrenome
//                 }
//             ));
//         };

//         return (
//             <KeyboardAvoidingView style={estilos.container}>
//                 <Logo style={estilos.logo} />
//                 <View style={estilos.cadastro}>
//                     <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Vamos nos conhecer melhor!</Texto>
//                     <View style={estilos.form}>
//                         <View style={estilos.grupoForm}>
//                             <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Agora nos diga seu sobrenome:</Texto>
//                             <Input
//                                 icone={<Feather name="user" style={estiloGlobal.inputIcone} />}
//                                 returnKeyType="next"
//                                 onSubmitEditing={e => proximo(e as any)}
//                                 textContentType="familyName"
//                                 autoCapitalize="words"
//                                 autoCorrect={false}
//                                 placeholder="Informe seu sobrenome"
//                                 value={sobrenome}
//                                 onChangeText={setSobrenome}
//                             />
//                         </View>
//                     </View>
//                 </View>
//                 <Botao titulo="Próxima etapa" icone="arrow-right" onPress={e => proximo(e)} />
//             </KeyboardAvoidingView>
//         );
//     };

//     const CadastroTela3 = ({ dados, setDados }: any) => {

//         const [email, setEmail] = useState<string>(dados.email);
//         const cadastroNavigation = useNavigation();

//         const proximo = (e: GestureResponderEvent) => {
//             e.preventDefault();
//             navegarProximo(cadastroNavigation, "fluxoCadastro4");

//             setDados((dados: any) => (
//                 {
//                     ...dados,
//                     email
//                 }
//             ));
//         };

//         return (
//             <KeyboardAvoidingView style={estilos.container}>
//                 <Logo style={estilos.logo} />
//                 <View style={estilos.cadastro}>
//                     <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Como podemos entrar em contato?</Texto>
//                     <View style={estilos.form}>
//                         <View style={estilos.grupoForm}>
//                             <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Informe seu endereço de e-mail:</Texto>
//                             <Input
//                                 icone={<Feather name="at-sign" style={estiloGlobal.inputIcone} />}
//                                 keyboardType="email-address"
//                                 onSubmitEditing={e => proximo(e as any)}
//                                 textContentType="emailAddress"
//                                 returnKeyType="next"
//                                 autoCapitalize="none"
//                                 autoCorrect={false}
//                                 placeholder="Endereço de e-mail"
//                                 value={email}
//                                 onChangeText={setEmail}
//                             />
//                         </View>
//                     </View>
//                 </View>
//                 <Botao titulo="Próxima etapa" icone="arrow-right" onPress={e => proximo(e)} />
//             </KeyboardAvoidingView>
//         );
//     };

//     const CadastroTela4 = ({ dados, setDados }: any) => {

//         const [senha, setSenha] = useState<string>(dados.senha);
//         const [senhaConfirma, setSenhaConfirma] = useState<string>(dados.senhaConfirma);

//         const cadastroNavigation = useNavigation();
//         const confirmaSenhaRef = useRef<TextInput>(null);

//         const proximo = (e: GestureResponderEvent) => {
//             e.preventDefault();
//             navegarProximo(cadastroNavigation, "fluxoCadastro5");

//             setDados((dados: any) => (
//                 {
//                     ...dados,
//                     senha,
//                     senhaConfirma
//                 }
//             ));
//         };

//         return (
//             <KeyboardAvoidingView style={estilos.container}>
//                 <Logo style={estilos.logo} />
//                 <View style={estilos.cadastro}>
//                     <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Proteja seu cadastro</Texto>
//                     <View style={estilos.form}>
//                         <View style={estilos.grupoForm}>
//                             <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Crie uma senha para fazer login no app:</Texto>
//                             <Texto style={[estiloGlobal.label, estilos.label]}>A senha deve possuir no mínimo 8 dígitos, letras maíusculas e minúsculas, números e simbolos.</Texto>
//                             <Input
//                                 icone={<Feather name="lock" style={estiloGlobal.inputIcone} />}
//                                 returnKeyType="next"
//                                 onSubmitEditing={() => confirmaSenhaRef.current?.focus()}
//                                 blurOnSubmit={false}
//                                 textContentType="newPassword"
//                                 secureTextEntry
//                                 autoCorrect={false}
//                                 placeholder="Crie uma senha"
//                                 value={senha}
//                                 onChangeText={setSenha}
//                             />
//                         </View>
//                         <View style={estilos.grupoForm}>
//                             <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Digite novamente sua senha:</Texto>
//                             <Input
//                                 icone={<Feather name="lock" style={estiloGlobal.inputIcone} />}
//                                 returnKeyType="next"
//                                 forwardRef={confirmaSenhaRef}
//                                 onSubmitEditing={e => proximo(e as any)}
//                                 textContentType="password"
//                                 secureTextEntry
//                                 autoCorrect={false}
//                                 placeholder="Confirme sua senha"
//                                 value={senhaConfirma}
//                                 onChangeText={setSenhaConfirma}
//                             />
//                         </View>
//                     </View>
//                 </View>
//                 <Botao titulo="Próxima etapa" icone="arrow-right" onPress={e => proximo(e)} />
//             </KeyboardAvoidingView>
//         );
//     };

//     const CadastroTela5 = ({ dados, setDados }: any) => {

//         const [cep, setCep] = useState<string>(dados.cep);
//         const [carregando, setCarregando] = useState<boolean>(false);
//         const cadastroNavigation = useNavigation();

//         const obterEndereco = async () => {
//             setCarregando(true);

//             try {
//                 const { data } = await enderecoServices.getEnderecoViaCep(cep);

//                 if (data.logradouro) {
//                     setDados((dados: any) => ({
//                         ...dados,
//                         logradouro: data.logradouro,
//                         bairro: data.bairro,
//                         cidade: data.localidade,
//                         uf: data.uf
//                     }));
//                 }
//             }
//             catch (error) {
//                 console.log(error);
//             }
//             finally {
//                 setCarregando(false);
//             }
//         };

//         const proximo = async (e: GestureResponderEvent) => {
//             e.preventDefault();

//             await obterEndereco();

//             setDados((dados: any) => (
//                 {
//                     ...dados,
//                     cep
//                 }
//             ));

//             navegarProximo(cadastroNavigation, "fluxoCadastro6");
//         };

//         return (
//             <KeyboardAvoidingView style={estilos.container}>
//                 {carregando &&
//                     <CarregandoOverlay />
//                 }
//                 <Logo style={estilos.logo} />
//                 <View style={estilos.cadastro}>
//                     <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Não precisa ir muito longe!</Texto>
//                     <View style={estilos.form}>
//                         <View style={estilos.grupoForm}>
//                             <Texto style={[estiloGlobal.label, estilos.label]}>Com base no seu endereço, te recomendaremos os melhores preços e ofertas em lojas, mercados e farmácias pertinho de você.</Texto>
//                             <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Nos informe seu CEP:</Texto>
//                             <Input
//                                 icone={<Feather name="hash" style={estiloGlobal.inputIcone} />}
//                                 returnKeyType="next"
//                                 onSubmitEditing={e => proximo(e as any)}
//                                 keyboardType="numeric"
//                                 textContentType="postalCode"
//                                 placeholder="CEP"
//                                 value={cep}
//                                 mascara="cep"
//                                 onChangeText={setCep}
//                                 maxLength={9}
//                             />
//                         </View>
//                     </View>
//                 </View>
//                 <Botao titulo="Próxima etapa" icone="arrow-right" onPress={e => proximo(e)} />
//             </KeyboardAvoidingView>
//         );
//     };

//     const CadastroTela6 = ({ dados, setDados }: any) => {

//         const [logradouro, setLogradouro] = useState<string>(dados.logradouro);
//         const [numero, setNumero] = useState<number>(dados.numero);
//         const [complemento, setComplemento] = useState<string>(dados.complemento);
//         const [bairro, setBairro] = useState<string>(dados.bairro);
//         const [cidade, setCidade] = useState<string>(dados.cidade);
//         const [uf, setUf] = useState<string>(dados.uf);

//         const cadastroNavigation = useNavigation();
//         const numeroInputRef = useRef<TextInput>(null);
//         const complementoInputRef = useRef<TextInput>(null);
//         const bairroInputRef = useRef<TextInput>(null);
//         const cidadeInputRef = useRef<TextInput>(null);
//         const estadoInputRef = useRef<TextInput>(null);

//         const proximo = (e: GestureResponderEvent) => {
//             e.preventDefault();
//             navegarProximo(cadastroNavigation, "fluxoCadastro7");

//             setDados((dados: any) => (
//                 {
//                     ...dados,
//                     logradouro,
//                     numero,
//                     complemento,
//                     bairro,
//                     cidade,
//                     uf
//                 }
//             ));
//         };

//         return (
//             <KeyboardAvoidingView style={estilos.container}>
//                 <Logo style={estilos.logo} />
//                 <View style={estilos.cadastro}>
//                     <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Este é seu endereço?</Texto>
//                     <View style={estilos.form}>
//                         <Texto style={[estiloGlobal.label, estilos.label]}>
//                             {dados.logradouro ?
//                                 "O endereço abaixo foi encontrado com base no CEP que você digitou. Confirme está tudo certo e corriga o que precisar."
//                                 :
//                                 "Não encontramos seu endereço com base no CEP que você digitou. Por favor, preencha os campos abaixo."
//                             }
//                         </Texto>
//                         <View style={estilos.grupoForm2}>
//                             <View style={[estilos.grupoForm, { flex: 2 }]}>
//                                 <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Logradouro</Texto>
//                                 <Input
//                                     icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
//                                     returnKeyType="next"
//                                     onSubmitEditing={() => numeroInputRef.current?.focus()}
//                                     blurOnSubmit={false}
//                                     textContentType="streetAddressLine1"
//                                     autoCapitalize="words"
//                                     autoCorrect={true}
//                                     placeholder="Nome da rua ou avenida"
//                                     value={logradouro}
//                                     onChangeText={setLogradouro}
//                                 />
//                             </View>
//                             <View style={[estilos.grupoForm, { flex: 1 }]}>
//                                 <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Número</Texto>
//                                 <Input
//                                     icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
//                                     returnKeyType="next"
//                                     onSubmitEditing={() => complementoInputRef.current?.focus()}
//                                     forwardRef={numeroInputRef}
//                                     blurOnSubmit={false}
//                                     keyboardType="numeric"
//                                     textContentType="streetAddressLine2"
//                                     autoCapitalize="words"
//                                     autoCorrect={true}
//                                     placeholder="Numero do imóvel"
//                                     value={numero.toString()}
//                                     onChangeText={(texto) => {
//                                         const numero = parseInt(texto) || 0;
//                                         setNumero(numero);
//                                     }}
//                                 />
//                             </View>
//                         </View>
//                         <View style={estilos.grupoForm}>
//                             <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Complemento</Texto>
//                             <Input
//                                 icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
//                                 returnKeyType="next"
//                                 onSubmitEditing={() => bairroInputRef.current?.focus()}
//                                 forwardRef={complementoInputRef}
//                                 blurOnSubmit={false}
//                                 textContentType="streetAddressLine1"
//                                 autoCapitalize="words"
//                                 autoCorrect={true}
//                                 placeholder="Bloco, número do apartamento, portão, etc."
//                                 value={complemento}
//                                 onChangeText={setComplemento}
//                             />
//                         </View>
//                         <View style={estilos.grupoForm}>
//                             <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Bairro</Texto>
//                             <Input
//                                 icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
//                                 returnKeyType="next"
//                                 forwardRef={bairroInputRef}
//                                 onSubmitEditing={() => cidadeInputRef.current?.focus()}
//                                 blurOnSubmit={false}
//                                 textContentType="sublocality"
//                                 autoCapitalize="words"
//                                 autoCorrect={true}
//                                 placeholder="Bairro"
//                                 value={bairro}
//                                 onChangeText={setBairro}
//                             />
//                         </View>
//                         <View style={estilos.grupoForm2}>
//                             <View style={[estilos.grupoForm, { flex: 2 }]}>
//                                 <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Cidade</Texto>
//                                 <Input
//                                     icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
//                                     returnKeyType="next"
//                                     forwardRef={cidadeInputRef}
//                                     onSubmitEditing={() => estadoInputRef.current?.focus()}
//                                     blurOnSubmit={false}
//                                     textContentType="addressCity"
//                                     autoCapitalize="words"
//                                     autoCorrect={true}
//                                     placeholder="Cidade ou município"
//                                     value={cidade}
//                                     onChangeText={setCidade}
//                                 />
//                             </View>
//                             <View style={[estilos.grupoForm, { flex: 1 }]}>
//                                 <Texto peso="700Bold" style={[estiloGlobal.label, estilos.label]}>Estado</Texto>
//                                 <Input
//                                     icone={<Feather name="map-pin" style={estiloGlobal.inputIcone} />}
//                                     returnKeyType="done"
//                                     forwardRef={estadoInputRef}
//                                     onSubmitEditing={e => proximo(e as any)}
//                                     textContentType="addressState"
//                                     autoCapitalize="characters"
//                                     placeholder="UF"
//                                     value={uf}
//                                     onChangeText={setUf}
//                                 />
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//                 <Botao titulo="Finalizar cadastro" icone="check-circle" onPress={e => proximo(e)} />
//             </KeyboardAvoidingView>
//         );
//     };

//     const CadastroTela7 = ({ nome, aoCadastrar }: any) => {

//         const [carregando, setCarregando] = useState<boolean>(true);
//         const navigation = useNavigation();
//         const { notificar } = useNotificacaoToast();

//         const finalizarCadastro = async () => {
//             setCarregando(true);

//             try {
//                 await aoCadastrar();
//             }
//             catch (erro) {
//                 notificar({
//                     estilo: "vermelho",
//                     texto: `Erro ao finalizar o cadastro: ${erro}`,
//                     autoDispensar: true,
//                     dispensavel: true
//                 });
//                 navegarProximo(navigation.getParent(), "login");
//             }
//             finally {
//                 setCarregando(false);
//             }
//         }

//         const proximo = async (e: GestureResponderEvent) => {
//             e.preventDefault();
//             navegarProximo(navigation.getParent(), "app");
//         };

//         useEffect(() => {
//             setMostraBanner(false);
//             finalizarCadastro();

//             navigation.addListener('beforeRemove', e => {
//                 if (e.data.action.type === "GO_BACK")
//                     e.preventDefault();
//                 return;
//             });

//             return () => {
//                 navigation.removeListener('beforeRemove', () => { });
//             };
//         }, []);

//         const escalaIcone = useSharedValue(0);

//         const animacaoIcone = useAnimatedStyle(() => {

//             escalaIcone.value = 1;

//             return {
//                 transform: [
//                     { scale: withDelay(500, withSpring(escalaIcone.value)) }
//                 ]
//             }
//         }, []);

//         return (
//             <View style={estilos.containerFim}>
//                 <Logo style={estilos.logo} />
//                 <Animated.View style={[estilos.cadastroFim, animacaoIcone]}>
//                     <Feather name="check-circle" style={estilos.cadastroFimIcone} />
//                 </Animated.View>
//                 <View style={estilos.cadastro}>
//                     <Texto peso="800ExtraBold" style={[estiloGlobal.titulo, estilos.titulo]}>Tudo pronto!</Texto>
//                     <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.titulo]}>Prazer em te conhecer, {nome}!</Texto>
//                     <Texto style={[estiloGlobal.label, estilos.label]}>Seu cadastro está concluído. Agora você pode cadastrar mercados e produtos e informar os preços que você encontrar.</Texto>
//                     <Texto style={[estiloGlobal.label, estilos.label]}>Se você precisar modificar alguma informação do seu cadastro, vá até as configurações da conta.</Texto>
//                 </View>
//                 <Botao titulo={carregando ? "Preparando sua economia..." : "Comece à economizar!"} disabled={carregando} icone="arrow-right" onPress={e => proximo(e)} />
//             </View>
//         );
//     };

//     return (
//         <View style={estilos.main}>
//             {mostraBanner ?
//                 <>
//                     <StatusBar hidden />
//                     <Image style={estilos.banner} source={require("../../../../assets/fundo_cadastro.jpg")} />
//                 </>
//                 :
//                 <>
//                     <StatusBar style={temaAtivo === "claro" ? "dark" : "light"} backgroundColor={propriedadesTema.cores.fundoPrincipal} hidden={false} />
//                 </>
//             }
//             <FluxoCadastro.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: propriedadesTema.cores.fundoPrincipal } }}>
//                 <FluxoCadastro.Screen
//                     name="fluxoCadastro1"
//                     options={{ animation: "slide_from_right" }}
//                     children={(props) => <CadastroTela1 dados={dadosCadastro} setDados={setDadosCadastro} {...props} />} />
//                 <FluxoCadastro.Screen
//                     name="fluxoCadastro2"
//                     options={{ animation: "slide_from_right" }}
//                     children={(props) => <CadastroTela2 dados={dadosCadastro} setDados={setDadosCadastro} {...props} />} />
//                 <FluxoCadastro.Screen
//                     name="fluxoCadastro3"
//                     options={{ animation: "slide_from_right" }}
//                     children={(props) => <CadastroTela3 dados={dadosCadastro} setDados={setDadosCadastro} {...props} />} />
//                 <FluxoCadastro.Screen
//                     name="fluxoCadastro4"
//                     options={{ animation: "slide_from_right" }}
//                     children={(props) => <CadastroTela4 dados={dadosCadastro} setDados={setDadosCadastro} {...props} />} />
//                 <FluxoCadastro.Screen
//                     name="fluxoCadastro5"
//                     options={{ animation: "slide_from_right" }}
//                     children={(props) => <CadastroTela5 dados={dadosCadastro} setDados={setDadosCadastro} {...props} />} />
//                 <FluxoCadastro.Screen
//                     name="fluxoCadastro6"
//                     options={{ animation: "slide_from_right" }}
//                     children={(props) => <CadastroTela6 dados={dadosCadastro} setDados={setDadosCadastro} aoCadastrar={enviarDadosCadastro} {...props} />} />
//                 <FluxoCadastro.Screen
//                     name="fluxoCadastro7"
//                     options={{ animation: "slide_from_bottom", gestureEnabled: false }}
//                     children={(props) => <CadastroTela7 nome={dadosCadastro.nome} aoCadastrar={enviarDadosCadastro} {...props} />} />
//             </FluxoCadastro.Navigator>
//         </View>
//     );
// }