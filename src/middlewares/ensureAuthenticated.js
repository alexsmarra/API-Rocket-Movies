const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

/* Middleware que vai interceptar as requisições, pegar o token e dentro do token pegar o id
do usuário para sabermos quem é o usuário que está fazendo a requisição */
function ensureAuthenticated(req, res, next) {
   // the token will stay here
   const authHeader = req.headers.authorization

   if(!authHeader) {
      throw new AppError("Uninformed JWT Token", 401)
   }

   const [, token] = authHeader.split(" ")

   try {
      // pega o id do usuário
      const { sub: user_id } = verify(token, authConfig.jwt.secret)

      // inserindo id do usuário na requisição
      req.user = {
         id: Number(user_id),
      }

      return next()

   } catch {
      throw new AppError("Invalid JWT Token", 401)
   }
}
module.exports = ensureAuthenticated