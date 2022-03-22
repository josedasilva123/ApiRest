const router = require("express").Router();
const jwt = require('jsonwebtoken');
const MongoDBConnect = require("../database/connect");

//Exemplo de middleware de authenticação
async function authenticateExample(req, res, next) {
  const token = req.headers["auth"];
  // token vem de headers: auth //

  jwt.verify(token, process.env.JWT_SECRET_KEY , function (err, decoded) {
    if (!err) {
        // ações antes de prosseguir para requisição
        next();
    } else {
        res.status(400).json({ message: "Ocorreu um erro, a token não é válida!"})
    }
  });
  next();
}

// Exemplo de middleware //
async function middlewareExample(req, res, next) {
  console.log("teste");
  next();
}

// Exemplos de rotas //
router.get("/:id", middlewareExample, async (req, res) => {
  const db = await MongoDBConnect();
  console.log(req.params);
  res.status(200).send({ message: "Fez um GET" });
});

router.post("/", middlewareExample, async (req, res) => {
  const db = await MongoDBConnect();
  console.log(req.body);
  //exemplo jwt
  jwt.sign({}, process.env.JWT_SECRET_KEY);
  res.status(200).send({ message: "Fez um POST" });
});

router.patch("/", async (req, res) => {
  const db = await MongoDBConnect();
  console.log(req.body);
  res.status(200).send({ message: "Fez um PATCH" });
});

router.delete("/", async (req, res) => {
  const db = await MongoDBConnect();
  console.log(req.body);
  res.status(200).send({ message: "Fez um DELETE" });
});

module.exports = router;
