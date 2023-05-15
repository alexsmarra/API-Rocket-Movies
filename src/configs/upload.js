const path = require("path")
// npm install multer   is the library that we'll use to upload 
const multer = require("multer")
// para gerar um hash aleatório, evitando nomes iguais de arquivos
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.resolve(__dirname, "uploads")

const MULTER = {
   storage: multer.diskStorage({
      destination: TMP_FOLDER,
      filename(req, file, callback) {
         // let's use the hash for the file names to be different
         const fileHash = crypto.randomBytes(10).toString("hex")
         const fileName = `${fileHash}-${file.originalname}`

         return callback(null, fileName)
      }
   })
}

module.exports = {
   TMP_FOLDER,
   UPLOADS_FOLDER,
   MULTER
}