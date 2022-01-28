const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const router = require('./router')
const errorHandler = require('./middleware/error-handler')

const app = new express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api', router)

app.use(errorHandler())

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})