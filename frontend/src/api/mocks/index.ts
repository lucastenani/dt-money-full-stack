import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getSummaryMock } from './get-summary-mock'
import { getTransactionsMock } from './get-transactions-mock'
import { registerTransactionMock } from './register-transaction-mock'

export const worker = setupWorker(
  registerTransactionMock,
  getTransactionsMock,
  getSummaryMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') return

  await worker.start()
}
