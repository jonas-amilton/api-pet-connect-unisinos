# API Endpoints

### Base URL

- Localhost

`http://localhost:3000`

- Render

`https://api-pet-connect-unisinos.onrender.com/`

## Endpoints

### Root

- **GET /**

- Retorna uma mensagem de boas-vindas.

**Exemplo de resposta:**

```json
"Hello, World!!!"
```

### Users

- **POST /users**

- Cria um novo usuário.

**Parâmetros do corpo da requisição:**

```json
{
  "email": "string",
  "username": "string",
  "password": "string",
  "isAdmin": "boolean"
}
```

**Exemplo de resposta (sucesso):**

```json
{
  "success": true,
  "message": "Usuário adicionado com sucesso"
}
```

**Exemplo de resposta (falha - usuário já existe):**

```json
{
  "success": false,
  "message": "Usuário já existe"
}
```

- **POST /users/login**

- Realiza o login de um usuário.

**Parâmetros do corpo da requisição:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Exemplo de resposta (sucesso):**

```json
{
  "success": true,
  "message": "Login bem-sucedido",
  "userInfo": {
    "id": 1,
    "email": "string",
    "username": "string",
    "isAdmin": true
  }
}
```

**Exemplo de resposta (falha - credenciais inválidas):**

```json
{
  "success": false,
  "message": "Credenciais inválidas"
}
```

### Pets

- **POST /pets**

- Cria um novo pet.

**Parâmetros do corpo da requisição:**

```json
{
  "name": "string",
  "age": "string",
  "syze": "string",
  "photo": "string"
}
```

**Exemplo de resposta (sucesso):**

```json
{
  "success": true,
  "message": "Pet adicionado com sucesso"
}
```

**Exemplo de resposta (falha - pet já foi cadastrado):**

```json
{
  "success": false,
  "message": "Pet já foi cadastrado"
}
```

- **GET /pets**

- Retorna a lista de todos os pets cadastrados.

**Exemplo de resposta (sucesso):**

```json
{
  "success": true,
  "message": "Pets listados com sucesso",
  "data": [
    {
      "id": 1,
      "name": "string",
      "age": "string",
      "syze": "string",
      "photo": "string"
    }
  ]
}
```

**Exemplo de resposta (falha - nenhum pet cadastrado):**

```json
{
  "success": false,
  "message": "Nenhum pet cadastrado!"
}
```
