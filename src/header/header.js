

import { worker } from '../mocks/browser.js';
worker.start();

function registrUser(){
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
    localStorage.setItem('currentUser', email);
    registrForm.reset();
    setTimeout(() => {
      registrForm.classList.remove('active');
      loginForm.classList.remove('active');
    }, 3000);
    }else{
      feedback.classList.add('error');
    }
    feedback.textContent = res.ok ? data.message : data.error || 'Unknown error';
    feedback.classList.add('visible');
    


    setTimeout(() => {
      feedback.classList.remove('visible');
    }, 3000);
  } catch (err) {
    feedback.textContent = 'Network error';
    feedback.classList.add('visible');

    setTimeout(() => {
      feedback.classList.remove('visible');
    }, 3000);
  }
  
});
};

function loginUser() {
  const contact = document.querySelector('.contact-menu');
  const accountBtn = document.querySelector('.account-btn');
  const registrForm = document.querySelector('#registr-form');
  const loginForm = document.querySelector('#login-form');
  const feedback = document.querySelector('.feedback-login');

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
        loginForm.reset();
        setTimeout(() => {
        registrForm.classList.remove('active');
        loginForm.classList.remove('active');
      }, 3000);
        accountBtn.textContent = 'Вийти';
      
      }else{
      feedback.classList.add('error');
    }

      feedback.textContent = data.message || data.error || 'Unknown error';
      feedback.classList.add('visible');
    } catch (err) {
      feedback.textContent = 'Network error';
      feedback.classList.add('visible');
    }

    setTimeout(() => {
      feedback.classList.remove('visible');
    }, 3000);
  });
}



function initUI () {
const contact = document.querySelector('.contact-menu');
    const contactBtn = document.querySelector('.contact-btn');
    const closeContact = document.querySelector('.close-contact');
    contactBtn.addEventListener('click', () => {
    contact.classList.add('active');
    });
    closeContact.addEventListener('click', () => {
    contact.classList.remove('active');
    });
    
    /*Меню:Увiйти*/
    const closeLogin = document.querySelector('.close-login');
    const userLogin = document.querySelector('.login-form');
    const accountBtn = document.querySelector('.account-btn');
    accountBtn.addEventListener('click', () => {
  const currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
    // 👉 Пользователь вошёл — выходим
    localStorage.removeItem('currentUser');
    accountBtn.textContent = 'Увійти';
    document.querySelector('.welcome').textContent = '';
    // Можно показать формы снова, если нужно
    userLogin.classList.add('active');
  } else {
    // 👉 Пользователь не вошёл — показываем формы
    userLogin.classList.add('active');
    userRegistr.classList.remove('active');
  }
});

   
    
  
    closeLogin.addEventListener('click', () => {
    userLogin.classList.remove('active');
    });

    /*Меню:Зареэструватися*/
    const closeRegistr = document.querySelector('.close-registr');
    const userRegistr = document.querySelector('.registr-form');
    const registrLink = document.querySelector('.registr-link');
    const loginLink = document.querySelector('.login-link');
    registrLink.addEventListener('click', () => {
    userRegistr.classList.add('active');
    userLogin.classList.remove('active');
    });
    loginLink.addEventListener('click', () => {
    userRegistr.classList.remove('active');
    userLogin.classList.add('active');
    });
    closeRegistr.addEventListener('click', () => {
    userRegistr.classList.remove('active');
    });

    /*Бургер*/

    const burgerMenu = document.querySelector('.nav-menu-items');
    const burgerBtn = document.querySelector('.burger');
    burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    });

    /*Форма 'Увiйти'*/

const selectLogin = document.querySelector('.login-email');
const loginTel = document.querySelector('.login-telefon');
const inputLogin = document.querySelector('#login-email');

let currentMethodLogin = 'email'; 

function toggleMethodLogin() {
  if (currentMethodLogin === 'email') {
    currentMethodLogin = 'phone';
    selectLogin.textContent = 'Телефон';
    loginTel.textContent = 'Email';
    inputLogin.placeholder = 'Введіть номер телефону...';
    inputLogin.type = 'tel';
    inputLogin.autocomplete = 'tel';
    inputLogin.pattern = '^\\+380\\d{9}$';
  } else {
    currentMethodLogin = 'email';
    selectLogin.textContent = 'Email';
    loginTel.textContent = 'Телефон';
    inputLogin.type = 'email';
    inputLogin.autocomplete = 'username';
    inputLogin.placeholder = 'Введіть email...';
    inputLogin.pattern = "^\\S+@\\S+\\.\\S+$";
  }
    inputLogin.value = '';
    inputLogin.classList.remove("show-errors");
};

selectLogin.addEventListener('click', () => {
  loginTel.classList.toggle('active');
});

loginTel.addEventListener('click', () => {
  loginTel.classList.remove('active');
  toggleMethodLogin();
});

inputLogin.addEventListener('invalid',  () => {
   if (currentMethodLogin === 'email') {
      inputLogin.setCustomValidity('Введіть коректний email, наприклад: name@example.com');
    } else {
      inputLogin.setCustomValidity('Введіть номер телефону у форматі +380...');
    };
    inputLogin.classList.remove("show-errors");
    void inputLogin.offsetWidth;
    inputLogin.classList.add("show-errors");
  });

  inputLogin.addEventListener('input', () => {
  inputLogin.setCustomValidity('');
  inputLogin.classList.remove("show-errors");
});

/*Форма 'Зареэструватися*/

const selectRegistr = document.querySelector('.registr-email');
const registrTel = document.querySelector('.registr-telefon');
const inputRegistr = document.querySelector('#registr-email');

let currentMethodRegistr = 'email'; 

function toggleMethodRegistr() {
  if (currentMethodRegistr === 'email') {
    currentMethodRegistr = 'phone';
    selectRegistr.textContent = 'Телефон';
    registrTel.textContent = 'Email';
    inputRegistr.placeholder = 'Введіть номер телефону...';
    inputRegistr.type = 'tel';
    inputRegistr.autocomplete = 'tel';
    inputRegistr.pattern = '^\\+380\\d{9}$';
  } else {
    currentMethodRegistr = 'email';
    selectRegistr.textContent = 'Email';
    registrTel.textContent = 'Телефон';
    inputRegistr.type = 'email';
    inputRegistr.autocomplete = 'username';
    inputRegistr.placeholder = 'Введіть email...';
    inputRegistr.pattern = '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$';
  }
    inputRegistr.value = '';
    inputRegistr.classList.remove("show-errors");
};

selectRegistr.addEventListener('click', () => {
  registrTel.classList.toggle('active');
});

registrTel.addEventListener('click', () => {
  registrTel.classList.remove('active');
  toggleMethodRegistr();
});

inputRegistr.addEventListener('invalid',  () => {
   if (currentMethodRegistr === 'email') {
      inputRegistr.setCustomValidity('Введіть коректний email, наприклад: name@example.com');
    } else {
      inputRegistr.setCustomValidity('Введіть номер телефону у форматі +380...');
    };
    inputRegistr.classList.remove("show-errors");
    void inputRegistr.offsetWidth;
    inputRegistr.classList.add("show-errors");
  });

  inputRegistr.addEventListener('input', () => {
  inputRegistr.setCustomValidity('');
  inputRegistr.classList.remove("show-errors");
});

const passwordHiddens = document.querySelectorAll('input[type="password"]');
const showHiddens = document.querySelectorAll('.show-hidden');

showHiddens.forEach((btn) => {
  btn.addEventListener('click', () => {
    passwordHiddens.forEach((input) => {
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });
});
};


document.addEventListener('DOMContentLoaded', () => {
  initUI();
  registrUser();
  loginUser();
});


