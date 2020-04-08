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

  const repository = { id: uuid(), title: title, url: url, techs: techs, likes: numLike };

  repositories.push(repository);

  return response.json(repository);
});

/**
 * Inicio da rota PUT, que serve para fazer alguma alteracao de um registro
 */

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json({ error: "Invalid id, project not found" });
  }

  const { likes } = repositories[repositoryIndex];
  
  const repository = { 
    id: id, 
    title: title, 
    url: url,  
    techs: techs, 
    likes: likes
  };

  repositories[repositoryIndex] = repository;
  
  return response.json(repository);
});

/**
 * Inicio da rota DELETE, que serve para deletar algum registro
 */

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json({ error: "Invalid id, project not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

/**
 * Inicio da rota POST, neste caso esta rota vai incrementar os likes
 */

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json({ error: "Invalid id, project not found" });
  }

  let auxNumLike = repositories[repositoryIndex].likes + 1;

  const repository = { id: id, 
    title: repositories[repositoryIndex].title, 
    url: repositories[repositoryIndex].url, 
    techs: repositories[repositoryIndex].techs, 
    likes: auxNumLike 
  };

  repositories[repositoryIndex] = repository;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;