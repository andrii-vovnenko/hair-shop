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
]

