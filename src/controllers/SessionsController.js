/* File for user authentication, if it is authenticated (with email and password
typed correctly), we will generate a token for it */

const knex = require("../database/knex")
const AppError = require("../utils/AppError")

// import token
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

const { compare } = require("bcryptjs")


class SessionsController {
   async create(req, res) {
      const { email, password } = req.body

      const user = await knex("users").where({ email }).first()

      if(!user) {
         throw new AppError("Wrong e-mail or password!", 401)
      }

      const passwordMatched = await compare(password, user.password)

      if(!passwordMatched) {
         throw new AppError("Password or e-mail doesn't match!", 401)
      }

      /* if the user was authenticated, let's generate a token for him, we'll use 
      the jsonwebtoken library (for more info, item 13 in guide.txt) */
      // for token
      const { secret, expiresIn } = authConfig.jwt
      const token = sign({}, secret, {
         subject: String(user.id),
         expiresIn
      })

      return res.json({ user, token })
   }
}

module.exports = SessionsController