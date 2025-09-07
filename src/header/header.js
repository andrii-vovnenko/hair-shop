

import { worker } from '../mocks/browser.js';
worker.start();

/*Регистрация*/

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

/*Авторизация*/

function loginUser() {
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

/*UI*/

function initUI () {

/*Контакти*/

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
    const cabinet = document.querySelector('.cabinet');
    const closeLogin = document.querySelector('.close-login');
    const userLogin = document.querySelector('.login-form');
    const accountBtn = document.querySelector('.account-btn');
    const loginLink = document.querySelector('.login-link');
    accountBtn.addEventListener('click', () => {
    userLogin.classList.toggle('active');
    userRegistr.classList.remove('active');
    });
    loginLink.addEventListener('click', () => {
    userRegistr.classList.remove('active');
    userLogin.classList.add('active');
    });
    closeLogin.addEventListener('click', () => {
    userLogin.classList.remove('active');
    });
    cabinet.addEventListener('click', () => {
      window.location.href = "./cabinet.html";
    });

    /*Меню:Зареэструватися*/
    
    const closeRegistr = document.querySelector('.close-registr');
    const userRegistr = document.querySelector('.registr-form');
    const registrLink = document.querySelector('.registr-link');
    registrLink.addEventListener('click', () => {
    userRegistr.classList.add('active');
    userLogin.classList.remove('active');
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

/*SaveUser*/

function saveUser() {
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

/*Додати до...*/

function getMockDB() {
  return JSON.parse(localStorage.getItem('mockDB') || '{}');
}

function saveMockDB(db) {
  localStorage.setItem('mockDB', JSON.stringify(db));
}

function addTo(){
const mockDB = getMockDB();
addToFavorites(mockDB);
addToCompare(mockDB);
addToCart(mockDB);
}

/*Додати до обраних*/

function addToFavorites(mockDB) {
  const currentUser = localStorage.getItem('currentUser') || 'guest';

  if (!mockDB.users) mockDB.users = {};
   if (!mockDB.users[currentUser]) mockDB.users[currentUser] = {};
  if (!mockDB.users[currentUser].cart) mockDB.users[currentUser].favorites = [];

  let favorites = mockDB.users[currentUser].favorites.map(Number);

  document.querySelectorAll('.action-btn.icon-heart').forEach((btn) => {
    const id = parseInt(btn.dataset.id, 10);
    const key = `liked-${id}`;

    if (favorites.includes(id)) {
      btn.classList.add('active');
      localStorage.setItem(key, JSON.stringify(true));
    }

    btn.addEventListener('click', () => {
      const isActive = btn.classList.toggle('active');
      btn.setAttribute('aria-pressed', isActive);
      

      if (isActive) {
        if (!favorites.includes(id)) favorites.push(id);
      } else {
        favorites = favorites.filter(favId => favId !== id);
      }

      mockDB.users[currentUser].favorites = favorites;
      saveMockDB(mockDB);
      localStorage.setItem(key, JSON.stringify(isActive));
      getFavoritesCount()
    });
  });
}


/*Додати до порiвняння*/

function addToCompare(mockDB) {
  const currentUser = localStorage.getItem('currentUser') || 'guest';

  if (!mockDB.users) mockDB.users = {};
   if (!mockDB.users[currentUser]) mockDB.users[currentUser] = {};
  if (!mockDB.users[currentUser].cart) mockDB.users[currentUser].compare = [];

  let compare = mockDB.users[currentUser].compare.map(Number);

  document.querySelectorAll('.action-btn.icon-compare').forEach((btn) => {
    const id = parseInt(btn.dataset.id, 10);
    const key = `compare-${id}`;

    if (compare.includes(id)) {
      btn.classList.add('active');
      localStorage.setItem(key, JSON.stringify(true));
    }

    btn.addEventListener('click', () => {
      const isActive = btn.classList.toggle('active');
      btn.setAttribute('aria-pressed', isActive);

      if (isActive) {
        if (!compare.includes(id)) compare.push(id);
      } else {
        compare = compare.filter(favId => favId !== id);
      }

      mockDB.users[currentUser].compare = compare;
      saveMockDB(mockDB);
      localStorage.setItem(key, JSON.stringify(isActive));
      getCompareCount() 
    });
  });
}

/*Додати до кошика*/

function addToCart(mockDB) {
  const currentUser = localStorage.getItem('currentUser') || 'guest';

  if (!mockDB.users) mockDB.users = {};
  if (!mockDB.users[currentUser]) mockDB.users[currentUser] = {};
  if (!mockDB.users[currentUser].cart) mockDB.users[currentUser].cart = [];

  let cart = mockDB.users[currentUser].cart.map(Number);

  document.querySelectorAll('.action-btn.icon-cart').forEach((btn) => {
    const id = parseInt(btn.dataset.id, 10);

    btn.addEventListener('click', () => {
      const index = cart.indexOf(id);

      if (index === -1) {
        cart.push(id);
      } 
      mockDB.users[currentUser].cart = cart;
      saveMockDB(mockDB);
      getСartCount();
    });
  });
}


/*Лiчильник обраних*/

function getFavoritesCount() {
  const currentUser = localStorage.getItem('currentUser') || 'guest';
  const mockDB = JSON.parse(localStorage.getItem('mockDB') || '{}');
  const emptyFavorites = document.querySelector('.icon.icon-heart');
  const fullFavorites = document.querySelector('.icon.icon-heart_full');
  const countBadge = document.querySelector('.favorites-count');


  const favorites = mockDB?.users?.[currentUser]?.favorites || [];
  if(favorites.length > 0){
    emptyFavorites.classList.add('active');
    fullFavorites.classList.add('active');
  }else{
    emptyFavorites.classList.remove('active');
    fullFavorites.classList.remove('active');
  }
  if(countBadge){
    countBadge.textContent = favorites.length;
  }
  return favorites.length;
}

/* Лiчильник до порiвняння*/

function getCompareCount() {
  const currentUser = localStorage.getItem('currentUser') || 'guest';
  const mockDB = JSON.parse(localStorage.getItem('mockDB') || '{}');
  const iconCompare = document.querySelector('.icon.icon-compare');
  const compareFull = document.querySelector('.compare-full');
  const countBadge = document.querySelector('.compare-count');


  const compare = mockDB?.users?.[currentUser]?.compare || [];
  if(compare.length > 0){
    iconCompare.classList.add('active');
    compareFull.classList.add('active');
  }else{
   iconCompare.classList.remove('active');
   compareFull.classList.remove('active');
  }
  if(countBadge){
    countBadge.textContent = compare.length;
  }
  return compare.length;
}

/* Лiчильник до кошика*/

function getСartCount() {
  const currentUser = localStorage.getItem('currentUser') || 'guest';
  const mockDB = JSON.parse(localStorage.getItem('mockDB') || '{}');
  const iconCart = document.querySelector('.icon.icon-cart');
  const cartFull = document.querySelector('.cart-full');
  const countBadge = document.querySelector('.cart-count');


  const cart = mockDB?.users?.[currentUser]?.cart || [];
  if(cart.length > 0){
    iconCart.classList.add('active');
    cartFull.classList.add('active');
  }else{
   iconCart.classList.remove('active');
   cartFull.classList.remove('active');
  }
  if(countBadge){
    countBadge.textContent = cart.length;
  }
  return cart.length;
}

export function initHeader() {
  initUI();
  registrUser();
  loginUser();
  saveUser();
  addTo();
  getFavoritesCount();
  getCompareCount();
  getСartCount()
};


