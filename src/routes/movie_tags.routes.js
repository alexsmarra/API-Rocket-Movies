const { Router } = require("express")

const MovieTagsController = require("../controllers/MovieTagsController")

const movie_tagsRoutes = Router()

const movieTagsController = new MovieTagsController()

movie_tagsRoutes.post("/", movieTagsController.create)
movie_tagsRoutes.delete("/:id", movieTagsController.delete)

module.exports = movie_tagsRoutes