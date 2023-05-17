const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router()
/* we did it like this in case we want to use another strategy different from const MULTER, 
we would create another variable. */
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post("/", usersController.create)
/* n precisaremos mais de pegar o id pelo params, pois estamos pegando o id do usuário em nosso
middleware, no try */
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.delete("/:id", ensureAuthenticated, usersController.delete)
/* Remembering, the path is to update a specific field, specific column, "upload.single()" is 
because we want upload only one file, and "avatar" is the column that will be changed */
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes