const express = require("express")

// vai pegar o index.js automaticamente
const routes = require("./routes")


const app = express()
app.use(express.json())

app.use(routes)

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))