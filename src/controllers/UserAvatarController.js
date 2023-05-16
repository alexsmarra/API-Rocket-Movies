/* Let's take the image that the user sent (which is in the TMP folder) and send it to the folder
upload.js, and put the image address in our database */

const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {
   async update(req, res) {
      const user_id = req.user.id
      const avatarFileName = req.file.filename

      const diskStorage = new DiskStorage()

      const user = await knex("users")
         .where({ 'id': user_id }).first()

      if(!user) {
         throw new AppError("Only authenticated users can change the avatar!", 401)
      }

      /* If there is an address in user.avatar... whenever the user is going to update the profile
      picture, we will delete the one that was stored */
      if(user.avatar) {
         await diskStorage.deleteFile(user.avatar)
      }
      
      /* Saving the new avatar.. */
      const filename = await diskStorage.saveFile(avatarFileName)
      user.avatar = filename

      await knex("users").update(user).where({ id: user_id })
      return res.json(user)
   }  
}

module.exports = UserAvatarController