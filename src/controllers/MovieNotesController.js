const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MovieNotesController {
   async create(req, res) {
      const { title, description, rating } = req.body
      const { user_id } = req.params

      if(rating <= 5) {
         await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
         })
      } else {
         throw new AppError("The rating needs to be between 0 and 5")
      }

      res.json()
   }

   async show(req, res) {
      const { title } = req.query

      const notesByName = await knex("movie_notes")
         .select("title", "description", "rating")
         .whereLike("title", `%${title}%`) 

      res.json(notesByName)
   } 

   async delete(req, res) {
      const { id } = req.params

      await knex("movie_notes").where({ id }).delete()

      res.json()
   }
}

module.exports = MovieNotesController