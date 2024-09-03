import { execSync } from 'node:child_process'

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../src/app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a new transaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'New Transaction',
      amount: 150,
      type: 'outcome',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('Should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'income',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    if (cookies) {
      const listTransactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies)

      expect(listTransactionsResponse.statusCode).toEqual(200)
      expect(listTransactionsResponse.body.transactions).toEqual([
        expect.objectContaining({
          title: 'New Transaction',
          amount: 5000,
          type: 'income',
        }),
      ])
    } else {
      throw new Error('No cookies returned from transaction creation response')
    }
  })

  it('Should be able to show just a transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'income',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    if (cookies) {
      const listTransactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies)

      const transaction = listTransactionsResponse.body.transactions[0]

      const searchTransactionResponse = await request(app.server)
        .get(`/transactions/${transaction.id}`)
        .set('Cookie', cookies)

      expect(searchTransactionResponse.statusCode).toEqual(200)
      expect(searchTransactionResponse.body.transaction).toEqual(transaction)
    } else {
      throw new Error('No cookies returned from transaction creation response')
    }
  })

  it('Should be able to search a transaction', async () => {
    const createTransactionResponse = await app.inject({
      method: 'POST',
      url: '/transactions',
      payload: {
        title: 'New Transaction',
        amount: 5000,
        type: 'income',
      },
    })

    const cookies = createTransactionResponse.cookies

    if (cookies.length > 0) {
      await app.inject({
        method: 'POST',
        url: '/transactions',
        payload: {
          title: 'Another Transaction',
          amount: 10000,
          type: 'outcome',
        },
      })

      const listTransactionsResponse = await app.inject({
        method: 'GET',
        url: '/transactions',
        headers: {
          Cookie: cookies
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join('; '),
        },
      })

      const transaction = listTransactionsResponse.json().transactions[0]
      const anotherTransaction = listTransactionsResponse.json().transactions[1]

      const searchTransactionResponse = await app.inject({
        method: 'GET',
        url: '/transactions/?title=New%20Transaction&type=income&amount=5000',
        headers: {
          Cookie: cookies
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join('; '),
        },
      })

      expect(searchTransactionResponse.statusCode).toEqual(200)
      expect(searchTransactionResponse.json().transactions[0]).toEqual(
        transaction,
      )
      expect(searchTransactionResponse.json().transactions[0]).not.toEqual(
        anotherTransaction,
      )
    } else {
      throw new Error('No cookies returned from transaction creation response')
    }
  })

  it('Should be able to list the summary', async () => {
    const createFirstTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'income',
      })

    const cookies = createFirstTransactionResponse.get('Set-Cookie')

    if (cookies) {
      await request(app.server)
        .post('/transactions')
        .send({
          title: 'Another Transaction',
          amount: 1000,
          type: 'outcome',
        })
        .set('Cookie', cookies)

      const listSummaryResponse = await request(app.server)
        .get('/transactions/summary')
        .set('Cookie', cookies)

      expect(listSummaryResponse.statusCode).toEqual(200)
      expect(listSummaryResponse.body.summary).toEqual({
        total: 4000,
        incomes: 5000,
        outcomes: -1000,
      })
    } else {
      throw new Error('No cookies returned from transaction creation response')
    }
  })

  it('Should be able to exclude a transaction from summary', async () => {
    const createFirstTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'income',
      })

    const cookies = createFirstTransactionResponse.get('Set-Cookie')

    if (cookies) {
      await request(app.server)
        .post('/transactions')
        .send({
          title: 'Another Transaction',
          amount: 1000,
          type: 'outcome',
        })
        .set('Cookie', cookies)

      const listTransactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies)

      const lastTransaction = listTransactionsResponse.body.transactions[1]

      const excludeTransactionResponse = await request(app.server)
        .patch(`/transactions/${lastTransaction.id}/exclude`)
        .set('Cookie', cookies)

      const listSummaryResponse = await request(app.server)
        .get('/transactions/summary')
        .set('Cookie', cookies)

      expect(excludeTransactionResponse.statusCode).toEqual(200)
      expect(listSummaryResponse.statusCode).toEqual(200)
      expect(listSummaryResponse.body.summary).toEqual({
        total: 5000,
        incomes: 5000,
        outcomes: 0,
      })
    } else {
      throw new Error('No cookies returned from transaction creation response')
    }
  })

  it('Should not be able to make requests without cookies', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'income',
      })
      .expect(201)

    await request(app.server).get('/transactions').expect(401)
    await request(app.server).get('/transactions/summary').expect(401)
  })
})
