import { getAccessToken, removeAccessToken } from './auth'

const BASE_URL = 'http://localhost:3000'

export async function request(path, options = {}) {
  const token = getAccessToken()

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    if (response.status === 401) {
      removeAccessToken()
    }

    throw new Error(data.message || '请求失败')
  }

  return data
}