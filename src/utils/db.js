import { connect, connection } from 'mongoose'

let isConnected = false

export async function connectToDB(url) {
  try {
    if(isConnected) return

    const db = await connect(url)
    
    connection.on("connected", () => {
      console.log(`Connected successfully to ${db.connection.db.databaseName}`)
      isConnected = true
    })
  } catch (error) {
    console.log(error)
    throw new Error(`ERROR TRYING TO CONNECT TO MONGODB: ${error}`)
  }
}
