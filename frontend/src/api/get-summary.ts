import { api } from '@/lib/axios'

export interface GetSummaryResponse {
  summary: {
    total: number
    incomes: number
    outcomes: number
  }
}

export async function getSummary() {
  const response = await api.get<GetSummaryResponse>('/transactions/summary')

  return response.data.summary
}
