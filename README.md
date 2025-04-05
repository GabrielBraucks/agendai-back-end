# agendai-back-end

## Como Iniciar a API

Para rodar a API localmente, siga os passos abaixo:

1. **Instale as dependências**
   
   Antes de iniciar a API, é necessário instalar todas as dependências do projeto. Para isso, execute o seguinte comando no terminal, dentro da pasta do projeto:
   
   ```sh
   npm install
   ```

2. **Inicie a API**
   
   Após a instalação das dependências, você pode iniciar a API com o seguinte comando:
   
   ```sh
   npm start
   ```
   
   Esse comando inicia a aplicação utilizando o **nodemon**, uma ferramenta que monitora alterações no código e reinicia automaticamente o servidor sempre que um arquivo for modificado. Isso facilita o desenvolvimento, evitando a necessidade de reiniciar o servidor manualmente a cada mudança.

Agora, a API estará rodando e pronta para ser testada! (No console deve aparecer em qual endereço está rodando o servidor).

---

## Endpoints da API

### Registrar Empresa

- **Rota:** `POST empresa/register`
- **Descrição:** Registra uma nova empresa no sistema.
- **Corpo da requisição:**
  ```json
  {
    "cnpj": "CNPJ da Empresa",
    "nome": "Nome da Empresa",
    "email": "email@empresa.com",
    "senha": "senhaSegura"
  }
  ```
- **Resposta de sucesso:**
  ```json
  {
    "message": "Empresa criada com sucesso!"
  }
  ```
- **Códigos de resposta:**
  - `201 Created` – Empresa registrada com sucesso.
  - `500 Internal Server Error` – Erro ao criar empresa.

### Login de Empresa

- **Rota:** `POST empresa/login`
- **Descrição:** Realiza o login da empresa.
- **Corpo da requisição:**
  ```json
  {
    "email": "email@empresa.com",
    "senha": "senhaSegura"
  }
  ```
- **Resposta de sucesso:**
  ```json
  {
    "message": "Login bem sucedido!",
    "empresa": {
      "cnpj": "CNPJ da Empresa",
      "nome": "Nome da Empresa",
      "email": "email@empresa.com",
    },
    "token": "jwt_token_aqui",
  }
  ```
- **Códigos de resposta:**
  - `201 Created` – Login realizado com sucesso.
  - `401 Unauthorized` – Credenciais inválidas.
  - `500 Internal Server Error` – Erro ao fazer login.

### Registrar Serviço

- **Rota:** `POST servico/`
- **Descrição:** Registra um novo serviço para uma empresa.
- **Corpo da requisição:**
  ```json
  {
    "nome": "Servico nome",
    "preco": 12,
    "duracao": "30 Minutos",
    "categoria": "categoria"
  }
  ```
- **Resposta de sucesso:**
  ```json
  {
    "message": "Servico criado com sucesso!"
  }
  ```
- **Códigos de resposta:**
  - `201 Created` – Serviço registrado com sucesso.
  - `401 Unauthorized` – Token inválido ou ausente.
  - `500 Internal Server Error` – Erro ao criar serviço.

### Listar Serviços

- **Rota:** `GET servico/`
- **Cabeçalho da requisição:**
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Descrição:** Lista todos os serviços disponíveis.
- **Resposta de sucesso:**
  ```json
  [
    {
      "id": 2,
      "nome": "Servico nome",
      "preco": 20,
      "duracao": "30 Minutos",
      "categoria": "categoria",
      "empresa": "Nome da Empresa"
    },
  ...
  ]
  ``` 
- **Códigos de resposta:**
  - `200 OK` – Serviços listados com sucesso.
  - `401 Unauthorized` – Token inválido ou ausente.
  - `500 Internal Server Error` – Erro ao listar serviços.

### Verificar Autenticação da Empresa (Comentado no diretório src/routes/empresaRoutes.js)

- **Rota:** `GET empresa/`
- **Descrição:** Verifica se a empresa está autenticada e retorna seu nome.
- **Cabeçalho da requisição:**
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Resposta de sucesso:**
  ```json
  {
    "mensagem": "Empresa: Nome da Empresa autenticada"
  }
  ```
- **Códigos de resposta:**
  - `200 OK` – Empresa autenticada com sucesso.
  - `401 Unauthorized` – Token inválido ou ausente.

### (versão inicial) Registrar Cliente

- **Rota:** `POST cliente/register`
- **Descrição:** Registra um novo cliente.
- **Corpo da requisição:**
  ```json
  {
    "cpf": "85608041020",
    "nome": "Jiji",
    "email": "jiji@email.com",
    "telefone": "1212341234",
    "senha": "123123"
  }
  ```
- **Resposta de sucesso:**
  ```json
  {
    "message": "Cliente criado com sucesso!"
  }
  ```
- **Códigos de resposta:**
  - `201 Created` – Cliente registrado com sucesso.
  - `401 Unauthorized` – Token inválido ou ausente.
  - `500 Internal Server Error` – Erro ao registrar cliente.

  ### (versão inicial) Login do Cliente

- **Rota:** `POST cliente/login`
- **Descrição:** Realiza o login do cliente.
- **Corpo da requisição:**
  ```json
  {
    "email": "cliente@email.com",
    "senha": "senhaSegura"
  }
  ```
- **Resposta de sucesso:**
  ```json
  {
    "message": "Login bem sucedido!",
    "cliente": {
      "cpf": "08427231105",
      "nome": "Jiji",
      "email": "jiji@email.com",
      "telefone": null
    },
    "token": "jwt_token_aqui",
  }
  ```
- **Códigos de resposta:**
  - `201 Created` – Login realizado com sucesso.
  - `401 Unauthorized` – Credenciais inválidas.
  - `500 Internal Server Error` – Erro ao fazer login.

  ### (versão inicial) Consultar Cliente

- **Rota:** `GET cliente/:id`
- **Descrição:** Consulta os dados do cliente pelo id.
- **Resposta de sucesso:**
  ```json
  {
    "id": 1,
    "cpf": "85608041020",
    "email": "jiji@email.com",
    "nome": "Jiji",
    "telefone": null,
    "tipo": 0
  }
  ```
- **Códigos de resposta:**
  - `201 Created` – Consulta realizada com sucesso.
  - `401 Unauthorized` – Credenciais inválidas.
  - `500 Internal Server Error` – Erro ao fazer login..

   ### (versão inicial) Delete Cliente

- **Rota:** `DELETE cliente/:id`
- **Descrição:** Deleta o cliente pelo id.
- **Resposta de sucesso:**
  ```json
  {
	  "message": "Cliente deletado com sucesso!"
  }
  ```
- **Códigos de resposta:**
  - `201 Created` – Delete realizado com sucesso.
  - `401 Unauthorized` – Credenciais inválidas.
  - `500 Internal Server Error` – Erro ao tentar deletar cliente: dados incorretos ou cliente inexistente