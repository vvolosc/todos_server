import { body, param, query } from 'express-validator'

export const titleValidationChain = body('title').trim().escape().notEmpty()

export const titleQueryValidationChain = query('title')
  .optional()
  .trim()
  .escape()
  .notEmpty()

export const idValidationChain = param('id').notEmpty()

export const completedValidationChain = body('completed').notEmpty().isBoolean()
