import fastify from 'fastify'
import cors from '@fastify/cors'
import { drivers, teams } from './data'

const server = fastify({ logger: true })

server.register(cors, {
  origin: '*',
})

server.get('/api/teams', async (_, response) => {
  response.type('application/json').code(200)
  return { teams }
})

server.get('/api/drivers', async (_, response) => {
  response.type('application/json').code(200)
  return { drivers }
})

interface DriverParams {
  id: string
}

server.get<{ Params: DriverParams }>(
  '/api/drivers/:id',
  async (request, response) => {
    const id = parseInt(request.params.id)
    const driver = drivers.find((d) => d.id === id)

    if (!driver) {
      response.type('application/json').code(404)
      return { message: 'Driver Not Found' }
    } else {
      response.type('application/json').code(200)
      return { driver }
    }
  }
)

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333

server.listen({ port }, () => {
  console.log(`Server started on port ${port}`)
})
