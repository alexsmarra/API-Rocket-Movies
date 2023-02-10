// 1
const express = require("express")

// 2
const app = express()

// 3
const PORT = 3333

// 4
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))