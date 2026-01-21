# SWAPI Characters Explorer 🌌

Uma aplicação web desenvolvida para explorar o universo de Star Wars, criada como resposta a um desafio técnico utilizando tecnologias modernas de desenvolvimento web.

## 🚀 Visão Geral

Este projeto oferece uma interface intuitiva para pesquisar e visualizar detalhes sobre os personagens de Star Wars. Utiliza a **SWAPI (Star Wars API)** e foca em excelência visual, performance e experiência do usuário (UX).

## ✨ Funcionalidades Principais

- **Interface Temática**: Estética do universo Star Wars com modo escuro customizado, tipografia temática e fundo estrelado animado.
- **Busca em Tempo Real**: Barra de pesquisa responsiva com um **hook customizado de debounce** para otimizar chamadas de API e fornecer feedback imediato.
- **Internacionalização (i18n)**: Suporte completo para **Inglês (EN)** e **Português (PT-BR)** com troca de idioma fluida.
- **Modais Detalhados**: Informações aprofundadas dos personagens, incluindo busca dinâmica de entidades relacionadas como **Filmes**, **Veículos** e **Naves**.
- **Performance Otimizada**: Busca de dados em paralelo utilizando **TanStack Query** (React Query) para transições suaves e cache eficiente.
- **Design Responsivo**: Layout totalmente responsivo priorizando a usabilidade em todos os tamanhos de dispositivo.
- **Arquitetura Limpa**: Estilos desacoplados (Styled Components), hooks customizados para reutilização de lógica e uma camada centralizada de serviços de API.

## 🛠️ Tecnologias Utilizadas

- **Core**: React 19 + TypeScript + Vite
- **Framework de UI**: [Ant Design (Antd)](https://ant.design/)
- **Estilização**: [Styled Components](https://styled-components.com/) + CSS-in-JS
- **Gerenciamento de Estado e Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Internacionalização**: [i18next](https://www.i18next.com/)
- **Ícones**: Ant Design Icons

## 📁 Estrutura do Projeto

```bash
src/
├── assets/             # Ativos estáticos (imagens, logos)
├── components/         # Componentes de UI reutilizáveis (Header, Table, Modal)
├── hooks/              # Hooks React customizados (useDebounce, useCharacters, etc.)
├── locales/            # Arquivos de tradução (EN/PT)
├── services/           # Camada de serviço de API (integração com SWAPI)
├── styles/             # Estilos globais e customizações do Ant Design
└── types/              # Interfaces e tipos TypeScript
```

## ⚙️ Como Executar

1. **Clonar o repositório**:
   ```bash
   git clone git@github.com:edugrutz/swapi-characters.git
   ```

2. **Instalar dependências**:
   ```bash
   npm install
   ```

3. **Executar em modo de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Gerar build de produção**:
   ```bash
   npm run build
   ```

## 🐳 Docker

Para simular o ambiente de desenvolvimento em um container, você pode usar o Docker:

1. **Subir o container**:
   ```bash
   docker compose up --build
   ```

2. **Acessar a aplicação**:
   Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

O ambiente Docker está configurado com **Hot Module Replacement (HMR)**, então as mudanças no código local serão refletidas automaticamente dentro do container.

## 🧪 Testes

A aplicação conta com testes unitários utilizando Jest e React Testing Library.

Para rodar todos os testes do projeto, utilize o comando:

```bash
npm test
```

Para ver a cobertura de testes:

```bash
npm run test:coverage
```

Para abrir a interface visual do Vitest (onde você pode ver os testes rodando em tempo real):

```bash
npm run test:ui
```

## 📂 Estrutura dos Testes

O projeto conta com 26 testes distribuídos em 7 arquivos principais:

### 1. Testes de Serviço (`src/services/__tests__`)
- **`swapi.test.ts` & `swapiDetails.test.ts`**:
    - **O que testam**: A comunicação com a API do Star Wars.
    - **Cenários**: Busca de personagens, listagem paginada, busca de detalhes de planetas, filmes, naves, etc.
    - **Mocking**: Usa MSW para retornar JSONs pré-definidos em vez de bater na API real.

### 2. Testes de Componentes UI (`src/components/**/__tests__`)
- **`CharacterCard/index.test.tsx`**:
    - **O que testa**: Se o card do personagem exibe corretamente o nome, altura, peso e ícone de gênero.
    - **Interação**: Garante que o evento `onClick` é disparado ao clicar no card.
- **`CharacterGrid/index.test.tsx`**:
    - **O que testa**: A renderização da lista de personagens, o estado de carregamento (spinner) e a exibição de alertas de erro.
    - **Busca**: Verifica se o campo de busca atualiza corretamente.
- **`CharacterProfile/index.test.tsx`**:
    - **O que testa**: A página de perfil completa, incluindo dados básicos e o nome do planeta natal.
    - **Cenários**: Testa o que acontece quando um personagem é encontrado e quando ele não existe.

### 3. Testes de Hooks e Utils
- **`src/hooks/__tests__/useDebounce.test.ts`**: Garante que o delay de busca funciona corretamente, evitando chamadas excessivas à API.
- **`src/utils/__tests__/extractId.test.ts`**: Testa a lógica de extração de IDs das URLs da API.

## 🧠 Decisões Técnicas

- **Customização do Ant Design**: O Ant Design foi customizado via Styled Components para evitar a aparência "genérica" da biblioteca.
- **Estratégia de API**: Utilização de `useQueries` para requisições paralelas ao abrir os detalhes do personagem, garantindo que todos os dados relacionados (filmes, naves) carreguem simultaneamente em vez de sequencialmente.
- **Versão do React (v19)**: Embora o desafio mencione React 17, a aplicação foi desenvolvida com React 19 por compatibilidade com versões atuais do TanStack Query e Ant Design. A arquitetura e os padrões utilizados permanecem totalmente compatíveis com React 17, e a migração seria direta caso necessário.

> **Nota sobre a API**: Este projeto utiliza a versão mantida pela comunidade em `https://swapi.py4e.com/api` ao invés da API original `swapi.dev`, devido a problemas de licenciamento e disponibilidade da versão original. A versão py4e.com é uma réplica funcional e estável mantida pelo projeto [PY4E (Python for Everybody)](https://www.py4e.com/).

## ✅ Requisitos Atendidos

- [x] Listagem de personagens via SWAPI
- [x] Filtro por nome
- [x] Paginação (10 itens por página)
- [x] Uso do Ant Design
- [x] Responsividade
- [x] Containerização com Docker
- [x] Testes unitários
- [x] Documentação completa