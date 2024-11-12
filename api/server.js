const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");
const app = express();
const port = 3000;

const jsonServerMiddleware = jsonServer.router("db.json");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!!!");
});

// users

app.post("/users", (req, res) => {
  const { email, username, password, isAdmin } = req.body;

  // Verifique se o usuário já existe no banco de dados
  const existingUser = jsonServerMiddleware.db
    .get("users")
    .find({ username })
    .value();

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Usuário já existe" });
  }

  // Obtenha o último ID de usuário no banco de dados
  const lastUser = jsonServerMiddleware.db
    .get("users")
    .orderBy("id", "desc")
    .first()
    .value();

  // Calcule o próximo ID disponível
  const nextId = lastUser ? lastUser.id + 1 : 1;

  // Adicione o novo usuário com o próximo ID
  jsonServerMiddleware.db
    .get("users")
    .push({
      id: nextId,
      email,
      username,
      password,
      isAdmin,
    })
    .write();

  res.json({ success: true, message: "Usuário adicionado com sucesso" });
});

app.post("/users/login", (req, res) => {
  const { username, password } = req.body;

  const users = jsonServerMiddleware.db.get("users").value();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({
      success: true,
      message: "Login bem-sucedido",
      userInfo: {
        id: user.id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Credenciais inválidas",
    });
  }
});

// pets

app.post("/pets", (req, res) => {
  const { name, age, syze, photo } = req.body;

  // Verifique se o pet já existe no banco de dados
  const existingPet = jsonServerMiddleware.db
    .get("pets")
    .find({ name })
    .value();

  if (existingPet) {
    return res
      .status(400)
      .json({ success: false, message: "Pet já foi cadastrado!" });
  }

  // Obtenha o último ID do pet no banco de dados
  const lastPet = jsonServerMiddleware.db
    .get("pets")
    .orderBy("id", "desc")
    .first()
    .value();

  // Calcule o próximo ID disponível
  const nextId = lastPet ? lastPet.id + 1 : 1;

  // Adicione o novo pet com o próximo ID
  jsonServerMiddleware.db
    .get("pets")
    .push({
      id: nextId,
      name,
      age,
      syze,
      photo,
    })
    .write();

  res.json({ success: true, message: "Pet adicionado com sucesso" });
});

app.get("/pets", (req, res) => {
  const allPets = jsonServerMiddleware.db
    .get("pets")
    .orderBy("id", "desc")
    .value();

  if (allPets.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Nenhum pet cadastrado!" });
  }

  res.json({
    success: true,
    message: "Pets listados com sucesso",
    data: allPets,
  });
});

// Use o JSON Server apenas para as rotas padrão
app.use(jsonServerMiddleware);

app.listen(port, () => {
  console.log(`Servidor rodando em 
http://localhost/
:${port}`);
});
