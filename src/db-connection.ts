import { MongoClient, ServerApiVersion, Db } from 'mongodb'

import seed from './seed.json'

export class DbConnection {
  client: MongoClient
  db: Db
  constructor() {
    this.client = new MongoClient('mongodb://root:example@127.0.0.1:27017', {
      serverApi: ServerApiVersion.v1,
    })
  }
  async init() {
    await this.client.connect()
    const collection = this.client.db('todo_db').collection('todos')
    await collection.drop()
    await collection.insertMany(seed)
    await this.client.db('todo_db').command({ ping: 1 })
    console.log('Connection to DB established')
    this.db = this.client.db('todo_db')
  }
}

export default new DbConnection()
