import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'

const app: Application = express()

app.use(express.json())
app.use(cors())

//application route

app.use('/api', router)

app.use(globalErrorHandler)
app.use(notFound)
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running')
})

export default app
