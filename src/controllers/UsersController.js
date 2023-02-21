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

      const hashedPassword = await hash(password, 8)

      await knex("users").insert({
         name,
         email,
         password: hashedPassword
      })

      // we will return an empty json
      return res.status(201).json()
   }

   async update(req, res) {
      const { name, email, password, new_password } = req.body
      const { id } = req.params

      const userExists = await knex("users").where({ id }).first()

      if(!userExists) {
         throw new AppError("User not found!")
      }

      const emailExists = await knex("users").where({ email }).first()

      if(emailExists) {
         throw new AppError("This email is already in use.")
      }

      if(password && new_password) {
         const validUserPassword = await knex
            .select("password")
            .from("users")
            .where({ id })

         const matchCurrentPasswordWithNewPassword = 
            await compare(password, validUserPassword[0].password)

         console.log(validUserPassword)

         console.log(matchCurrentPasswordWithNewPassword)

         const newHashedPassword = await hash(new_password, 8)
         
         if(!matchCurrentPasswordWithNewPassword) {
            throw new AppError("You need to enter a old_password correctly.")
         }

         await knex("users").where({ id }).update({
            password: newHashedPassword
         })
      }

      await knex("users").where({ id }).update({
         name,
         email
      })

      return res.json()
   }

   async delete(req, res) {
      const { id } = req.params

      await knex("users").where({ id }).delete()

      res.json()
   }
}

module.exports = UsersController

// 

// async update(request, response) {
//    const user_id = request.user.id
//    const { name, email, password, new_password } = request.body

//    const userExists = await knex('users').where({ email })
//    if (userExists.length === 1 && userExists[0].id !== user_id) {
//      throw new AppError('Email já cadastrado')
//    }

//    if (password && new_password) {
//      const validUserPassword = await knex
//        .select('password')
//        .from('users')
//        .where('id', user_id)

//      const checkOldPassword = await compare(
//        password,
//        validUserPassword[0].password
//      )
//      const att_password = await hash(new_password, 8)
//      if (!checkOldPassword) {
//        throw new AppError('A senha antiga nao confere')
//      }

//      const user_update = await knex('users').where('id', user_id).update({
//        password: att_password
//      })
//    }

//    const user_update = await knex('users').where('id', user_id).update({
//      name,
//      email
//    })

//    return response.json()
//  }