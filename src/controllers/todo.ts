import { ObjectId } from 'mongodb'

import dbConnection from '../db-connection'

export class TodoController {
  getTodos = async (title?: string) => {
    const titleParams = title ? { title: { $regex: title } } : {}

    const notCompleted = await dbConnection.db
      .collection('todos')
      .find({ ...titleParams, completed: false })
      .sort({ title: 1 })
      .toArray()

    const completed = await dbConnection.db
      .collection('todos')
      .find({ ...titleParams, completed: true })
      .sort({ title: 1 })
      .limit(10)
      .toArray()

    return { completed, notCompleted }
  }
  async exists(field, value) {
    const result = await dbConnection.db
      .collection('todos')
      .findOne({ [field]: value })

    return !!result
  }
  async createTodo(title: string) {
    const exist = await this.exists('title', title)
    if (exist) {
      return null
    }

    return dbConnection.db
      .collection('todos')
      .insertOne({ title, completed: false })
  }

  async updateTodo(id, body) {
    const exist = await this.exists('_id', new ObjectId(id))
    if (!exist) {
      return null
    }
    return dbConnection.db.collection('todos').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: body,
      }
    )
  }

  deleteTodos = () => {
    return dbConnection.db.collection('todos').deleteMany()
  }
}
