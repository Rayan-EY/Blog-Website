import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
}).$extends(withAccelerate())
const app = new Hono()

app.post('/api/v1/signup', (c) => {
  return c.text('Hello Hono! signup')
})

app.post('/api/v1/signin', (c) => {
  return c.text('Hello Hono! signin')
})
app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono! blog post')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono! blog put')
})

app.get('/api/v1/blog/:id', (c) => {
  const id=c.req.param;
  return c.text('Hello Hono! blog')
})

export default app
