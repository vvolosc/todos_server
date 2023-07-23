import express from 'express'
import cors from 'cors'

import dbConnection from './db-connection'
import router from './routes/todos'
import errorMiddleware from './middlewares/errorMiddleware'

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/todos', router)
app.use(errorMiddleware)

dbConnection.init().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
  })
)
