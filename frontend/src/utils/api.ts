import Axios from 'axios'
import { delay } from './delay'

const URL = 'http://localhost:5000'
const axios = Axios.create({ baseURL: URL })

export async function login(username: string, password: string) {
  await delay(1200)
  try {
    const { data } = await axios.post('/login', { username, password })
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export async function logout() {
  await delay(1000)
  try {
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken') || '')
    await axios.delete('/logout', { data: { refreshToken } })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  } catch (error) {
    console.log(error)
  }
}

export async function getProfile() {
  await delay(500)
  try {
    const token = JSON.parse(localStorage.getItem('accessToken') || '')?.token
    const { data } = await axios.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
