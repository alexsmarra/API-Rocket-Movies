const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MovieTagsController {
   async create(req, res) {
      const { name } = req.body 
      const { note_id, user_id } = req.query

      await knex("movie_tags")
         .insert({ 
            name,
            note_id,
            user_id
         })

         return res.json()
   }

   async index(req, res) {
      const { name } = req.query

      const genresWithTitles = await 
         knex("movie_tags")
         .select("movie_notes.title", "name")
         .whereLike("name", `%${name}%`)
         .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")

      return res.json(genresWithTitles)
   }

   async delete(req, res) {
      const { id } = req.params

      await knex("movie_tags")
         .where({ id })
         .delete()

      return res.json()
   }
}

module.exports = MovieTagsController