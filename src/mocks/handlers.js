import { rest } from 'msw'

export const handlers = [
  rest.get('/api/favorites', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ id: 1, name: 'Scissors' }, { id: 2, name: 'Shampoo' }])
    )
  }),

  rest.post('/api/like', (req, res, ctx) => {
    return res(ctx.status(201))
  }),

  rest.post('/api/register', async (req, res, ctx) => {
    const { email, password } = await req.json()

    if (!email || !password) {
      return res(ctx.status(400), ctx.json({ error: 'Missing fields' }))
    }

    return res(ctx.status(201), ctx.json({ message: 'Registered successfully' }))
  }),
]
