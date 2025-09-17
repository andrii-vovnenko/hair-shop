import { getFavoritesCount,getCompareCount,getCartCount} from '../gallery/gallery.js'
export function registrUser(){
const loginForm = document.querySelector('#login-form');
const registrForm = document.querySelector('#registr-form');
const feedback = document.querySelector('.feedback-registr');

registrForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(registrForm);
  const email = formData.get('registr-email');
  const password = formData.get('registr-password');

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
    registrForm.reset();
     setTimeout(() => {
      feedback.classList.remove('visible');
      registrForm.classList.remove('active');
      loginForm.classList.remove('active');
    }, 3000);
    }else{
      feedback.classList.add('error');
      setTimeout(() => {
      feedback.classList.remove('error','visible');
    }, 3000);
    }
    feedback.textContent = data.message || data.error;
    feedback.classList.add('visible');
    } catch (err) {
    feedback.textContent = 'Щось пiшло не так...🤔';
    feedback.classList.add('error');
    setTimeout(() => {
    feedback.classList.remove('error');
     }, 3000);
    }
  });
};

export function loginUser() {
  const accountBtn = document.querySelector('.account-btn');
  const registrForm = document.querySelector('#registr-form');
  const loginForm = document.querySelector('#login-form');
  const feedback = document.querySelector('.feedback-login');
  const cabinet = document.querySelector('.cabinet');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get('login-email');
    const password = formData.get('login-password');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('currentUser', email);
        getFavoritesCount();
        getCompareCount();
        getCartCount();
        loginForm.reset();
        accountBtn.classList.add('active');
        cabinet.classList.add('active');
        setTimeout(() => {
      feedback.classList.remove('visible');
      registrForm.classList.remove('active');
      loginForm.classList.remove('active');
    }, 3000);
      }else{
      feedback.classList.add('error');
      setTimeout(() => {
      feedback.classList.remove('error','visible');
    }, 3000);
    }
      feedback.textContent = data.message || data.error;
      feedback.classList.add('visible');
    } catch (err) {
      feedback.textContent = 'Щось пiшло не так...🤔';
      feedback.classList.add('error');
    }
      setTimeout(() => {
      feedback.classList.remove('error');
    }, 3000);
  });
}

export function saveUser() {
  const currentUser = localStorage.getItem('currentUser');
  const cabinet = document.querySelector('.cabinet');
  const accountBtn = document.querySelector('.account-btn')
  if (currentUser) {
    accountBtn.classList.add('active');
    cabinet.classList.add('active');
  } else {
    accountBtn.classList.remove('active');
    cabinet.classList.remove('active');
  }
}