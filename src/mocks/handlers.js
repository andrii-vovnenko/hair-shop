import { http,HttpResponse} from 'msw';
import { mockDB } from './mockDB.js';

export const handlers = [
http.post('/api/register', async ({ request }) => {
  const { email, password } = await request.json();
if (mockDB.users.has(email)) {
  return HttpResponse.json(
    {error: 'Користувач вже існує'}, 
    {status: 409},
)};
 
mockDB.users.set(email, {email,password});
mockDB.save();
  
return HttpResponse.json(
    { message: 'Реєстрація успішна🥳' },
    { status: 200, }
  );
}),

http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();
    const user = mockDB.getUser(email);

    if (!user || user.password !== password) {
      return HttpResponse.json(
        { error: 'Невірний email або пароль' },
        { status: 401 }
      );
    }

    return HttpResponse.json(
      { message: 'Вхід успішний 🎉', user },
      { status: 200 }
    );
  })
];
