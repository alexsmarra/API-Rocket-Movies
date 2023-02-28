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

      res.json()
   }

   async delete(req, res) {
      const { id } = req.params

      await knex("movie_tags")
         .where({ id })
         .delete()

      res.json()
   }
}

module.exports = MovieTagsController