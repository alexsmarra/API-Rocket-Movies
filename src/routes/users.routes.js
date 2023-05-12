const { Router } = require("express")

const UsersController = require("../controllers/UsersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
/* n precisaremos mais de pegar o id pelo params, pois estamos pegando o id do usuário em nosso
middleware, no try */
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.delete("/:id", usersController.delete)

module.exports = usersRoutes