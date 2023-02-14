/*  "hash" is the function that will generate the encryption (criptografia)
"compare" is to compare the encrypted password with the old_password entered (digitado) by the user   */
const { hash, compare } = require("bcryptjs")

const AppError = require("../utils/AppError")

class UsersController {
   async create(req, res) {
      const { name, email, password } = req.body

      // to database connect
      const database = await sqliteConnection()
      // To check if the registered email exists (para verificar se já existe o email cadastrado, para que não tenha dois emails iguais)
      // Inside the parenthesis the question mark (o ponto de interrogação) is for the variable we want to look for, which in this case is the email, and outside between square brackets (colchetes) we put the variable we want to replace. How many 'question marks (?)' we have, according to their order (de acordo com sua ordem), will be for other variables that we want.
      const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

      if(checkUserExists) {
         throw new AppError("This email is already in use.")
      }
      
      // For encryption (const hash above). The "8" is for encryption complexity level.
      const hashedPassword = await hash(password, 8)

      await database.run(
         "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
         // using the encrypted password (hashedPassword)
         [name, email, hashedPassword]
      )

      // we will return an empty json
      return res.status(201).json()
   }
}

module.exports = UsersController