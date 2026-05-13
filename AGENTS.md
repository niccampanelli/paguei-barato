# Paguei Barato - Manual Técnico para Agentes de IA

## Visão Geral
Aplicativo React Native (Expo 53) para busca e comparação de preços de produtos em mercados/lojas/farmácias próximas. TypeScript obrigatório, convenções em português brasileiro (sem acentuação no código, pt-br correto na UI).

## Stack e Arquitetura
- **React Native + Expo 53**, **TypeScript** (tipagem forte obrigatória)
- **Redux Toolkit** (estado global), **expo-router** (roteamento file-based)
- **Zod + React Hook Form** (validação obrigatória), **Axios** (serviços), **Expo Secure Store** (tokens)
- **StyleSheet** puro com variáveis do `tema.ts`

### Estrutura de Pastas
- `app/`: Rotas expo-router (grupos `(desprotegidas)`, `(protegidas)`)
- `components/`: Reutilizáveis por domínio
- `store/`: Slices Redux + thunks
- `services/`: APIs (mockadas atualmente)
- `types/`: Definições TS por domínio
- `schemas/`: Validações Zod
- `constants/`: Tema e configs

## Entidades Principais
| Entidade | Identificador | Campos Chave |
|----------|---------------|--------------|
| Usuario | GUID | Campos auditoria |
| Produto | Numérico | Nome, Marca, Categorias, Atributos (key-value) |
| Loja | Numérico | Nome, Ramos, Endereço completo |
| Estoque | Numérico | Relação Produto-Loja + histórico preços |
| Relato | Numérico | Preços manuais dos usuários |
| Categoria/ProdutoCategoria | Numérico | Nome, Descricao |
| Ramo/LojaRamo | Numérico | Nome, Descricao |
| Marca | Numérico | Relacionamento com Produto |

**Auditoria**: Todos recursos têm `CriadoPor` (usuário) e `CriadoEm` (timestamp).

## Convenções e Padrões de Desenvolvimento

### Nomenclatura e Código
- **Português brasileiro sem acentuação** (apenas código: `Descricao`, `Endereco`)
- Nomes no singular, PascalCase (componentes/tipos), camelCase (variáveis/funções)
- Pastas com `index.ts` para exports centralizados (imports "barrel")
- **Exportações diretas**: Use `export default function` para componentes e funções principais
- **Desencoraje**: Métodos em constantes (`const metodo = async...`); prefira declarações de função

### Estado Global (Redux)
- `createSlice` para reducers síncronos, `createAsyncThunk` para assíncronos
- Hooks tipados: `useAppDispatch`, `useAppSelector`
- Estado imutável, payloads estruturados

### Componentes
- Funcionais com props tipadas, valores padrão opcionais
- Estilos via `StyleSheet` + tema global (`constants/tema.ts`)
- Pequenos e reutilizáveis

### Formulários
- **Obrigatório**: React Hook Form + Zod resolvers
- Schemas em `schemas/` com validações refinadas
- Campos com `Controller` para customizados

### APIs e Serviços
- Funções assíncronas em `services/`, tipos request/response em `types/services/`
- Axios para chamadas reais (atualmente mockadas com dados fictícios + delays)
- Tratamento erros: `try/catch`, `rejectWithValue`

### Roteamento (expo-router)
- File-based, grupos `(desprotegidas)` (login/cadastro) e `(protegidas)` (áreas logadas)
- Layouts aninhados (`_layout.tsx`), rotas dinâmicas (`[id].tsx`)

### Autenticação
- Provider de Auth + verificação no Root Layout
- Tokens persistidos com Expo Secure Store

### Feedback e Erros
- Padrão: Toast para notificações e erros
- Alertas via contexto Redux (`alertaSlice`)

## Comandos
```bash
npm run lint         # Linting
eas build --platform android  # Build Android
eas build --platform ios     # Build iOS
```

## Notas Técnicas
- APIs mockadas: substitua por reais quando backend disponível
- Temas: claro/escuro (apenas claro implementado)
- Cadastro: formulários multi-etapa
- Navegação: abas nas protegidas, busca com filtros/localização

## Documentação Relacionada
- [Diagrama de Telas](docs/telas.drawio.svg)
- [Expo Docs](https://docs.expo.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)</content>
<parameter name="filePath">/mnt/Midia/Desktop/Projetos/paguei-barato/AGENTS.md