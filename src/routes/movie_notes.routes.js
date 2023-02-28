const { Router } = require("express")

const MovieNotesController = require("../controllers/MovieNotesController")

const movie_notesRoutes = Router()

const movie_notesController = new MovieNotesController()

movie_notesRoutes.post("/:user_id", movie_notesController.create)
movie_notesRoutes.delete("/:id", movie_notesController.delete)

module.exports = movie_notesRoutes