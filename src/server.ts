/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
import { Server } from 'http'

// eslint-disable-next-line no-unused-vars
let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
