const AppError = require("../utils/AppError")

class UsersController {
   create(req, res) {
      const { name, email, password } = req.bodyefa

      if(!name) {
         throw new AppError("Name is mandatory!")
      }

      res.status(201).json({ name, email, password })
   }
}

module.exports = UsersController