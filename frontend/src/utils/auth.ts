import Axios from 'axios'
import { delay } from './delay'

const URL = 'http://localhost:5000'
const axios = Axios.create({
  baseURL: URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
})

export async function login(username: string, password: string) {
  await delay(1500)
  try {
    const { data } = await axios.post('/login', { username, password })
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export async function logout() {
  await delay(1500)
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    await axios.delete('/logout', { data: { refreshToken } })
  } catch (error) {
    console.log(error)
  }
}
