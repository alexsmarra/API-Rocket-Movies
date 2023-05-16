// For more explanations, see file '../configs/upload.js' . This file is to upload and delete users files, (for image uploads), is linked to '../configs/uploads.js'. The image upload by the user will be temporarily in the tmp folder, and after being filtered, it will go to the uploads folder

const fs = require("fs")
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage {
   async saveFile(file) {
      /* The node's rename module is to move the file or rename the file, in this case we are using to move the file. The first param is where the file is, the second param is where
      the file will be */
      await fs.promises.rename(
         path.resolve(uploadConfig.TMP_FOLDER, file),
         path.resolve(uploadConfig.UPLOADS_FOLDER, file)
      )

      return file
   }

   async deleteFile(file) {
      const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

      try {
         /* The stat function check the state of the file, to see if it will be deleted or not */
         await fs.promises.stat(filePath)
      } catch {
         return 
      }

      //  to delete the file
      await fs.promises.unlink(filePath)
   }
}

module.exports = DiskStorage