const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const id = uuid();
  const repository = { id, likes: 0, ...request.body };
  repositories.push(repository);
  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex((rep) => rep.id === id);

  if (index < 0) {
    return response.status(400).send();
  }

  const repository = { id, ...request.body, likes: 0 };
  repositories[index] = repository;
  response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex((rep) => rep.id === id);

  if (index < 0) {
    return response.status(400).send();
  }
  repositories.splice(index, 1);
  response.send(204);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex((rep) => rep.id === id);

  if (index < 0) {
    return response.status(400).send();
  }

  const repository = repositories[index];
  repository.likes++;

  repositories[index] = repository;

  response.send(repository);
});

module.exports = app;
