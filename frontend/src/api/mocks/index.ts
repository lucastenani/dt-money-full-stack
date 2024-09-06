import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { excludeTransactionMock } from './exclude-transaction-mock'
import { getSummaryMock } from './get-summary-mock'
import { getTransactionDetailsMock } from './get-transaction-details-mock'
import { getTransactionsMock } from './get-transactions-mock'
import { registerTransactionMock } from './register-transaction-mock'

export const worker = setupWorker(
  registerTransactionMock,
  excludeTransactionMock,
  getTransactionsMock,
  getSummaryMock,
  getTransactionDetailsMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') return

  await worker.start()
}
