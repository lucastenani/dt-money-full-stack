import { expect, test } from 'vitest'

test('user can create a new transaction', () => {
  const statusCode = 200

  expect(statusCode).toEqual(201)
})
