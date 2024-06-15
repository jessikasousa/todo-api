# To-Do List API

Este projeto é uma API para gerenciamento de tarefas com autenticação de usuários e gerenciamento de tarefas.

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- MySQL2
- Body-parser
- JWT (jsonwebtoken)
- Bcryptjs

## Requisitos

- Node.js (v14 ou superior)
- MySQL

## Configuração do Ambiente

Para rodar o projeto, siga estes passos:

Clone o repositório:
  ``` bash
   git clone <url-do-repositório>
  ```

Navegue até o diretório do projeto:
```
cd TODO-API
```

Instale as dependências:
```
npm install
```

#### Configuração do Banco de Dados:

Certifique-se de que o MySQL está em execução.
Crie um banco de dados chamado todo_db.
Crie a tabela users e tasks:
```
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE
);
```

#### Configuração do Arquivo de Ambiente (.env):

Copie o arquivo *.env example* e renomeie para *.env* e troque por suas variáveis.


#### Inicie o servidor:
```
npm start
```

## Uso
A API suporta as seguintes operações através de endpoints REST:

### Autenticação
#### Registrar Usuário
Endpoint: /api/register
Método: POST
Body:
``` json
{
  "name": "Nome do Usuário",
  "email": "email@example.com",
  "password": "senha"
}
```
#### Login de Usuário
Endpoint: /api/login
Método: POST
Body:
``` json
{
  "email": "email@example.com",
  "password": "senha"
}
```

### Tarefas
#### Criar Tarefa
Endpoint: /api/tasks
Método: POST
Headers:
``` json
{
  "Authorization": "Bearer <token>"
}
```
Body:
``` json
{
  "title": "Título da Tarefa",
  "description": "Descrição da Tarefa"
}
```

#### Obter Todas as Tarefas
Endpoint: /api/tasks
Método: GET
Headers:
``` json
{
  "Authorization": "Bearer <token>"
}
```

#### Obter Tarefa por ID
Endpoint: /api/tasks/:id
Método: GET
Headers:
``` json
{
  "Authorization": "Bearer <token>"
}
```

#### Atualizar Tarefa por ID
Endpoint: /api/tasks/:id
Método: PUT
Headers:
``` json
{
  "Authorization": "Bearer <token>"
}
```
Body:
``` json
{
  "title": "Novo Título",
  "description": "Nova Descrição",
  "completed": true
}
```

#### Deletar Tarefa por ID
Endpoint: /api/tasks/:id
Método: DELETE
Headers:
``` json
{
  "Authorization": "Bearer <token>"
}
```
