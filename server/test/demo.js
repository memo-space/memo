import Fastify from 'fastify'
import { usersData } from './mockData'

const app = Fastify({
  logger: process.env.NODE_ENV === 'development',
})

app.get('/users', async () => {
  return usersData
})

export default app
