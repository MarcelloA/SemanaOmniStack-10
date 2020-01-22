// Metodos HTTP: GET, POST, PUT, DELETE
// Query Params: request.query (filtros, ordenação, paginação, ...)
// Route Params: request.parms (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)
// MongoDB (Não-relacional)
// cors: remover o bloqueio de acesso externo
/*  nodemon.json
    "execMap": {
        "js": "node --inspect"
        },
    */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-ao1aa.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json()); // entender requisiçoes json
app.use(routes);

app.listen(3333);

