# 💻 Remote System Pulse - Web Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/Shadcn-UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

> **Interface de monitoramento em tempo real.**

Este projeto é o frontend da solução de monitoramento de servidores. Ele consome a API REST e conecta-se via **WebSockets (STOMP)** para receber atualizações de status (Online/Offline) instantaneamente, sem a necessidade de recarregar a página.

---

## Funcionalidades

* **Dashboard em Tempo Real:** Atualização automática de status dos servidores via WebSockets.
* **Gerenciamento de Inventário:** Telas para listagem, cadastro, edição e remoção de servidores.
* **Feedback Visual:** Indicadores de status e notificações "Toast" para eventos do sistema.
* **Arquitetura Híbrida:** Utiliza **Server Components** para carregamento rápido de dados iniciais e **Client Components** para interatividade em tempo real.

---

## 🛠 Tech

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Componentes UI:** [Shadcn/UI](https://ui.shadcn.com/)
* **Comunicação Real-time:** `@stomp/stompjs` & `sockjs-client`
* **Gerenciamento de Estado:** React Context API (para conexão WebSocket global)
* **Ícones:** Lucide React

---

## Como Rodar o Projeto

### Pré-requisitos
* Node.js 18+ instalado.
* O backend deve estar rodando para que as funcionalidades de dados funcionem.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/CaioEd/ServersHealth-Next.git
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configuração de Variáveis de Ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto e configure o endereço da API Java:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1/
    NEXT_PUBLIC_WEBSOCKETS_URL=http://localhost:8080/ws-pulse
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  Acesse `http://localhost:3000` no seu navegador.

---

## 📂 Arquitetura do Projeto

O projeto segue a estrutura do **Next.js App Router**, organizado por funcionalidades para facilitar a escalabilidade.

```text
src/
├── app/
│   ├── (dashboard)/       # Layout autenticado com Sidebar e WebSocket Provider
│   │   ├── page.tsx       # Dashboard Principal (Visão Geral)
│   │   └── servers/       # CRUD de Servidores
│   │       ├── page.tsx   # Lista (Server Component)
│   │       └── new/       # Formulário de Adição
│   └── layout.tsx         # Root Layout
├── components/
│   ├── ui/                # Componentes base (Shadcn - Button, Card, Input)
│   └── dashboard/         # Widgets específicos (StatusBadge, ServerCard)
├── context/
│   └── WebSocketContext.tsx # Gerencia a conexão STOMP única para toda a aplicação
├── lib/
│   └── api.ts             # Instância do Axios configurada
├── types/                 # Interfaces TypeScript (DTOs espelhados do Java)
└── services/              # Camada de integração (Server Actions & Fetch)