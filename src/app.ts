import express, { Application } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'

const app: Application = express()

app.use(express.json())
app.use(cors())

//application route
app.get('/', (req, res) => {
  res.send('Hello Assignment 3!')
})

app.use('/api', router)
app.use(globalErrorHandler)
app.use(notFound)

export default app
