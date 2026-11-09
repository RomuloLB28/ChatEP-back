
## ⚙️ ChatEP Back-end — Core & API de Serviços



O **ChatEP Back-end** é o núcleo de serviços do ecossistema ChatEP. Desenvolvido com **NestJS** para o gerenciamento da API principal (responsável por salvar os dados do usuário, exercícios e sessões na aplicação) e integração com o microsserviço em  **FastAPI** (Python)



---



## 🌀 Como Clonar o Repositório



Certifique-se de ter o **Git** e o **Node.js** instalados em seu ambiente de desenvolvimento. Copie e rode no terminal o bloco abaixo:

<br>

<br>



```bash

git clone [https://github.com/RomuloLB28/chatep-back.git](https://github.com/RomuloLB28/chatep-back.git)

cd chatep-back

```

---



## 📂 Abrir o Diretório



Abra seu VS Code, abra uma nova janela (ou inicie na mesma janela em que você está), vá em **File**, selecione a opção de abrir um novo diretório e navegue até o diretório que acabamos de clonar (`chatep-back`). Selecione-o e abra-o.



*(Dica: se preferir via terminal, basta digitar `code .` dentro da pasta do projeto).*



---

## 📂 Abrir o Diretório

Abra seu VS Code, abra uma nova janela (ou inicie na mesma janela em que você está), vá em **File**, selecione a opção de abrir um novo diretório e navegue até o diretório que acabamos de clonar (`chatep-back`). Selecione-o e abra-o.

*(Dica: se preferir via terminal, basta digitar `code .` dentro da pasta do projeto).*

---

## 🚀 Como Iniciar o Projeto

### 1. Configurar as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseando-se no arquivo de exemplo e configure sua string de conexão com o banco de dados e as portas dos serviços.

```bash
cp .env.example .env

```

### 2. Instalar as Dependências do NestJS (Core)

O NestJS é o responsável por gerenciar as requisições, atividades, sessões e persistir/recuperar os dados do banco.

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install

```

### 3. Rodar o Servidor de Desenvolvimento

Para iniciar a API principal em NestJS:

```bash
npm run start:dev
# ou
yarn start:dev

```

---

## 📸 Endpoints e Módulos do Sistema

### 👤 Gerenciamento de Requisições, Sessões, Atividades e Banco de Dados (NestJS)

Estrutura de controle de sessões, persistência/recuperação de dados do banco e interface com os microsserviços.

---

## 🛠️ Tecnologias Utilizadas

* **Core & Gestão de Dados:** NestJS, TypeScript, Node.js (Requisições, Atividades, Sessões e Banco)
* **Banco de Dados:** MongoDB, Mongoose
* **Infraestrutura / Deploy:** Render

## Link para o Front-end:

https://github.com/RomuloLB28/ChatEP

## Link para o Microservice:

https://github.com/RomuloLB28/chatep-microservice

```

```
