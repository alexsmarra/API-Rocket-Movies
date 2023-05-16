require("express-async-errors")

const AppError = require("./utils/AppError")

const uploadConfig = require("./configs/upload")

// npm install cors  para que o nosso backend consiga atender as requisições do nosso frontend
const cors = require("cors")
const express = require("express")

// vai pegar o index.js automaticamente
const routes = require("./routes")


const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

// error handling
app.use((err, req, res, next) => {
   // client side
   if(err instanceof AppError) {
      return res.status(err.statusCode).json({
         status: "error",
         message: err.message
      })
   }
   
   console.log(err)
   
   // server side
   return res.status(500).json({
      status: "error",
      message: "Internal server error"
   })
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))