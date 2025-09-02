import { http } from 'msw';
import { mockDB } from './mockDB.js';

export const handlers = [
http.post('/api/register', async ({ request }) => {
  const { email, password } = await request.json();

  if (mockDB.users.has(email)) {
    return new Response(JSON.stringify({ error: 'Користувач вже існує' }), {
      status: 409,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  mockDB.users.set(email, password);
  mockDB.save();


  return new Response(
    JSON.stringify({ message: 'Реєстрація успішна🥳' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
})

];
