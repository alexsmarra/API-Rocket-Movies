const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MovieNotesController {
   async create(req, res) {
      const { title, description, rating } = req.body
      const { user_id } = req.params

      const usersId = await knex("users").select("id")
      
      const ids = usersId.map(item => {
         return item.id
      })

      const userExists = ids.filter(item => item == user_id)

      console.log(userExists)

      if(userExists.length === 0) {
         throw new AppError("user_id does not exist")
      }

      if(rating < 0 || rating > 5) {
         throw new AppError("Rating must be between 0 and 5")
      }

      if(userExists && rating <= 5 && rating >= 0) {
         await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
         })
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

   async index(req, res) {
      const { user_id } = req.params

      const notesWithTags = await 
         knex("movie_notes")
         .select("title", "description", "rating", "movie_tags.name")
         .where("movie_notes.user_id", user_id)
         .innerJoin("movie_tags", "movie_notes.id", "movie_tags.note_id")

      res.json(notesWithTags)
   }

   async delete(req, res) {
      const { id } = req.params

      await knex("movie_notes").where({ id }).delete()

      res.json()
   }
}

module.exports = MovieNotesController