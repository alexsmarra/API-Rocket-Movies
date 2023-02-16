/*  "hash" is the function that will generate the encryption (criptografia)
"compare" is to compare the encrypted password with the old_password entered (digitado) by the user   */
const { hash, compare } = require("bcryptjs")

const knex = require("../database/knex")

const AppError = require("../utils/AppError")

class UsersController {
   async create(req, res) {
      const { name, email, password } = req.body

      const checkUserExists = await knex("users")
         .where("email", email).first()
         
      if(checkUserExists) {
         throw new AppError("This email is already in use.")
      }

      await knex("users").insert({
         name,
         email,
         password
      })

      // we will return an empty json
      return res.status(201).json()
   }

   async delete(req, res) {
      const { id } = req.params

      await knex("users").where({ id }).delete()

      res.json()
   }
}

module.exports = UsersController