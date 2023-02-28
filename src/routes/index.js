const { Router } = require("express")

const usersRouter = require("./users.routes")
const movie_notesRouter = require("./movie_notes.routes")

const routes = Router()
routes.use("/users", usersRouter)
routes.use("/movie_notes", movie_notesRouter)

module.exports = routes