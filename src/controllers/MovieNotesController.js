const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MovieNotesController {
   async create(req, res) {
      const { username, title, description, rating, tags } = req.body
      const user_id = req.user.id

      const validUser = await knex("users")
         .where("id", user_id)
         .andWhere("name", username)

      if(validUser.length === 0) {
         throw new AppError("User not found, unable to create note!")
      }

      if(rating < 0 || rating > 5) {
         throw new AppError("Rating must be between 0 and 5")
      }

      const note_id = await knex("movie_notes").insert({
         title,
         description,
         rating,
         user_id
      })

      const allTags = tags.map(tag => {
         return {
            note_id,
            user_id,
            name: tag
         }
      })

      await knex("movie_tags").insert(allTags)

      return res.json(allTags)
   }









   //
   async teste(request, response) {
      const { user_name, title, description, rating, tags } = request.body
      // const user_id = request.user.id
      const { user_id } = request.params
  
      const validUser = await knex('users')
        .where('name', user_name)
        .andWhere('id', user_id)
  
      if (validUser.length === 0) {
        throw new AppError(
          'Nao foi possivel criar a nota, usuario nao encontrado'
        )
      }
  
      if (rating < 0 || rating > 5) {
        throw new AppError(
          'A nota do filme nao pode ser menor que zero, nem maior de 5'
        )
      }
  
      const note_id = await knex('movie_notes').insert({
        title,
        description,
        user_grade: Math.ceil(rating),
        user_id
      })
  
      const tagInsert = tags.map(name => {
        return {
          note_id,
          name,
          user_id
        }
      })
  
      await knex('movie_tags').insert(tagInsert)
  
      return response.json()
    }
   //





   async show(req, res) {
      const { title } = req.query

      const notesByName = await knex("movie_notes")
         .select("title", "description", "rating")
         .whereLike("title", `%${title}%`) 

      return res.json(notesByName)
   } 

   async index(req, res) {
      const user_id = req.user.id

      const notesWithTags = await 
         knex("movie_notes")
         .select("title", "description", "rating", "movie_tags.name")
         .where("movie_notes.user_id", user_id)
         .innerJoin("movie_tags", "movie_notes.id", "movie_tags.note_id")

      return res.json(notesWithTags)
   }

   async delete(req, res) {
      const { id } = req.params

      await knex("movie_notes").where({ id }).delete()

      return res.json()
   }
}

module.exports = MovieNotesController