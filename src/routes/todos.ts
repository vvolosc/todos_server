import express from 'express'
import { validationResult, matchedData } from 'express-validator'

import { TodoController } from '../controllers/todo'
import {
  completedValidationChain,
  idValidationChain,
  titleQueryValidationChain,
  titleValidationChain,
} from '../middlewares/validation'

const router = express.Router()
const todoController = new TodoController()

router.get('/', titleQueryValidationChain, async (req, res) => {
  const validation = validationResult(req)

  if (validation.isEmpty()) {
    const { title } = matchedData(req)

    const result = await todoController.getTodos(title)

    return res.send(result)
  }

  return res.status(400).send({ errors: validation.array() })
})

router.post('', titleValidationChain, async (req, res) => {
  const validation = validationResult(req)

  if (validation.isEmpty()) {
    const { title } = matchedData(req)

    const result = await todoController.createTodo(title)

    if (!result) return res.sendStatus(409)

    return res.sendStatus(201)
  }

  return res.status(400).send({ errors: validation.array() })
})

router.patch(
  '/:id',
  idValidationChain,
  completedValidationChain,
  async (req, res) => {
    const validation = validationResult(req)
    if (validation.isEmpty()) {
      const { id, completed } = matchedData(req)

      const result = await todoController.updateTodo(id, { completed })
      if (!result) return res.sendStatus(422)

      return res.sendStatus(200)
    }

    return res.status(400).send({ errors: validation.array() })
  }
)

router.delete('', async (req, res) => {
  await todoController.deleteTodos()

  return res.sendStatus(200)
})

export default router
