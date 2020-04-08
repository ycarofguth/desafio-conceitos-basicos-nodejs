const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  const { id } = request.query;
  const results = id
    ? repositories.filter(repository => repository.id == id)
    : repositories

  return response.json(results);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs = [] } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Repository ID not found.' });
  }

  const repoId = repositories.findIndex(repository => repository.id == id);

  const {
    title = repositories[repoId].title, 
    url = repositories[repoId].url , 
    techs = repositories[repoId].techs 
  } = request.body;

  const repository = {
    id: repositories[repoId].id,
    title,
    url,
    techs,
    likes: repositories[repoId].likes,
  };

  repositories[repoId] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  // TODO
  const { id } = req.params;
  if (!isUuid(id)) {
    return res.status(400).json({ error: 'Repository ID not found.' });
  }

  const repoId = repositories.findIndex(repository => repository.id == id);

  repositories.splice(repoId, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Repository ID not found.' });
  }

  const repoId = repositories.findIndex(repository => repository.id == id);

  repositories[repoId].likes++

  return response.json(repositories[repoId]);
});

module.exports = app;
