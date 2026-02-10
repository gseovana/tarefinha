# CSI606-2025-02 - Trabalho Final - Resultados

**Discente:** Geovana Silva de Oliveira

---

## 📝 Resumo

Este trabalho apresenta o desenvolvimento do **Tarefinha**, um sistema web voltado para a organização e o acompanhamento de tarefas domésticas em repúblicas. A motivação para o projeto surgiu a partir de uma experiência pessoal, em conversas com as moradoras da minha casa, nas quais foi identificada a dificuldade de encontrar ferramentas simples e eficazes que auxiliassem na divisão justa e clara das tarefas do dia a dia.

O sistema foi desenvolvido com foco em simplicidade e colaboração entre os moradores, permitindo a criação de repúblicas, o gerenciamento de tarefas domésticas e o acompanhamento das atividades realizadas. Dessa forma, o Tarefinha busca contribuir para uma rotina mais organizada e colaborativa no ambiente compartilhado das repúblicas.

---

## 1. ✅ Funcionalidades implementadas

De acordo com o escopo definido na proposta inicial, as seguintes funcionalidades foram implementadas no sistema:

* Cadastro e autenticação de usuários
* Criação de repúblicas
* Ingresso em repúblicas por meio de código de acesso
* Definição de um líder da república
* Criação e gerenciamento de tarefas domésticas pelo líder
* Atribuição de responsáveis às tarefas
* Definição da frequência das tarefas
* Visualização das tarefas individuais na tela inicial do usuário
* Visualização das tarefas gerais da república
* Marcação de tarefas como concluídas

Essas funcionalidades permitem que os moradores tenham uma visão clara de suas responsabilidades individuais e das tarefas gerais da casa, facilitando a organização coletiva.

---

## 2. ❌ Funcionalidades previstas e não implementadas

Algumas funcionalidades previstas na proposta inicial não foram implementadas nesta versão do sistema:

* Histórico detalhado de execução das tarefas
* Filtros avançados para visualização das tarefas
    * *O único filtro implementado foi o de visualização das tarefas por usuário*
* Sistema de recompensas ou multas para incentivo à colaboração

Essas funcionalidades não foram incluídas principalmente devido a limitações de tempo, em razão do período com alta carga de trabalhos de diferentes disciplinas, além da priorização das funcionalidades essenciais para o funcionamento básico do sistema.

---

## 3. ✨ Outras funcionalidades implementadas

Além das funcionalidades previstas inicialmente, foram implementadas algumas regras de negócio adicionais relacionadas à gestão dos membros da república:

* O líder pode definir o tipo de cada membro, como calouro, decano, membro ou agregado.
* O líder pode promover outro membro a líder, perdendo consequentemente essa posição.

Essas funcionalidades surgiram durante o desenvolvimento do sistema e contribuíram para uma representação mais fiel da dinâmica real de uma república.

---

## 4. 🤯 Principais desafios e dificuldades

Durante o desenvolvimento do trabalho, diversos desafios foram enfrentados, principalmente relacionados à definição do escopo e à implementação da lógica de permissões entre usuários comuns e o líder da república. Ao longo do desenvolvimento, novas ideias e detalhes foram surgindo, o que tornou difícil definir o momento adequado para encerrar a implementação, já que sempre parecia haver algo a ser melhorado.

Outro desafio significativo foi o desenvolvimento do front-end, que passou por diversas alterações. Para aprimorar a estética e a usabilidade, foi necessário recorrer à opinião de terceiros, o que resultou em uma interface final bastante diferente daquela apresentada no protótipo inicial.

Essas dificuldades foram superadas por meio de pesquisa, testes incrementais e ajustes constantes no código e na modelagem do sistema, sempre buscando alinhar a implementação aos objetivos definidos na proposta.

---

## 5. 🚀 Instruções para instalção e execução

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos
Antes de começar, certifique-se de ter o **Node.js** instalado em sua máquina.

### Passo a passo

1.  **Clone o repositório**
    ```bash
    git clone git@github.com:gseovana/tarefinha.git
    cd tarefinha
    ```

2.  **Instale as dependências**
    É necessário instalar as dependências tanto do Front-end quanto do Back-end. Abra o terminal na raiz do projeto e execute:

    ```bash
    # Instalar dependências do servidor
    cd server
    npm install

    # Voltar e instalar dependências da web
    cd ../web
    npm install
    ```

3.  **Configure o Banco de Dados (Back-end)**
    Crie um arquivo `.env` na pasta `server`. Defina as variáveis de ambiente necessárias (conexão com o banco e segredo JWT):

    ```env
    DATABASE_URL="file:./prisma/tarefinha-db.sqlite"
    JWT_SECRET="jwt_secret"
    ```

    Ainda na pasta `server`, execute o comando para criar as tabelas no banco de dados SQLite:
    ```bash
    npx prisma migrate dev
    ```

4.  **Execute o Back-end**
    Na pasta `server`, inicie a API:
    ```bash
    npm run dev
    ```

5.  **Execute o Front-end**
    Abra um **novo terminal**, navegue até a pasta `web` e inicie o servidor de desenvolvimento:
    ```bash
    cd web
    npm run dev
    ```

6.  **Acesse o sistema**
    Abra seu navegador e acesse o endereço indicado no terminal do front-end (geralmente `http://localhost:5173`).

---

## 6. 📚 Referências

* **MDN Web Docs.** Disponível em: <https://developer.mozilla.org/pt-BR/>. Acesso em: fev. 2026.
* **React Documentation.** Disponível em: <https://react.dev/>. Acesso em: fev. 2026. 
* **Tailwind CSS Documentation.** Disponível em: <https://tailwindcss.com/docs>. Acesso em: fev. 2026.
* **Prisma ORM Documentation.** Disponível em: <https://www.prisma.io/docs>. Acesso em: fev. 2026.
* **Node.js Documentation.** Disponível em: <https://nodejs.org/en/docs/>. Acesso em: fev. 2026.

---

<div align="center">
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="250"/>
</div>
