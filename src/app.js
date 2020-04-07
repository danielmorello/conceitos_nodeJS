const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const numLike = 0;

/**
 * Inicio da rota GET, que serve para listar todos os registros 
 */

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

/**
 * Inicio da rota do POST, que serve para adicionar um novo registro
 */

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title: title, url: url, techs: techs, like: numLike };

  repositories.push(repository);

  return response.json(repository);
});

/**
 * Inicio da rota PUT, que serve para fazer alguma alteracao de um registro
 */

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json({ error: "Invalid id" });
  }
  
  const repository = { 
    id, 
    title, 
    url, 
    techs, 
    numLike 
  };

  repositories[repositoryIndex] = repository;
  
  return response.json(repository);
});

/**
 * Inicio da rota DELETE, que serve para deletar algum registro
 */

app.delete("/repositories/:id", (req, res) => {
  return response.json({ message: 'DELETE response.' });
});

/**
 * Inicio da rota POST, neste caso esta rota vai incrementar os likes
 */

app.post("/repositories/:id/like", (request, response) => {
  return response.json({ message: 'POST_LIKE response.' });
});

module.exports = app;
