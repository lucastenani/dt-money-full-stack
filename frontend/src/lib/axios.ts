import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  withCredentials: true,
  baseURL: env.VITE_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})
