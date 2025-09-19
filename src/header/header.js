import { getFavoritesCount,getCompareCount,getCartCount } from '../gallery/gallery.js';
import { worker } from '../mocks/browser.js';
import {registrUser,loginUser,saveUser} from '../mocks/users.js';
worker.start();

function showContacts() {
const contact = document.querySelector('.contact-menu');
    const contactBtn = document.querySelector('.contact-btn');
    const closeContact = document.querySelector('.close-contact');
    contactBtn.addEventListener('click', () => {
    contact.classList.add('active');
    })
    closeContact.addEventListener('click', () => {
    contact.classList.remove('active');
    })
  }

function loginMenu() {
    const cabinet = document.querySelector('.cabinet');
    const closeLogin = document.querySelector('.close-login');
    const userLogin = document.querySelector('.login-form');
    const accountBtn = document.querySelector('.account-btn');
    const loginLink = document.querySelector('.login-link');
    accountBtn.addEventListener('click', () => {
    userLogin.classList.toggle('active');
    userRegistr.classList.remove('active');
    })
    loginLink.addEventListener('click', () => {
    userRegistr.classList.remove('active');
    userLogin.classList.add('active');
    })
    closeLogin.addEventListener('click', () => {
    userLogin.classList.remove('active');
    })
    cabinet.addEventListener('click', () => {
      window.location.href = "./cabinet.html";
    })
 }    
    
function registrMenu() {
    const closeRegistr = document.querySelector('.close-registr');
    const userRegistr = document.querySelector('.registr-form');
    const registrLink = document.querySelector('.registr-link');
    registrLink.addEventListener('click', () => {
    userRegistr.classList.add('active');
    userLogin.classList.remove('active');
    })
    closeRegistr.addEventListener('click', () => {
    userRegistr.classList.remove('active');
    })
}
   
function burgerMenu() {
    const burgerMenu = document.querySelector('.nav-menu-items');
    const burgerBtn = document.querySelector('.burger');
    burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    })
}    

function loginForm() {
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
  }

    selectLogin.addEventListener('click', () => {
    loginTel.classList.toggle('active');
  })

    loginTel.addEventListener('click', () => {
    loginTel.classList.remove('active');
    toggleMethodLogin();
})

inputLogin.addEventListener('invalid',  () => {
   if (currentMethodLogin === 'email') {
      inputLogin.setCustomValidity('Введіть коректний email, наприклад: name@example.com');
    } else {
      inputLogin.setCustomValidity('Введіть номер телефону у форматі +380...');
    }
    inputLogin.classList.remove("show-errors");
    void inputLogin.offsetWidth;
    inputLogin.classList.add("show-errors");
  })

  inputLogin.addEventListener('input', () => {
  inputLogin.setCustomValidity('');
  inputLogin.classList.remove("show-errors");
})
}

function registrForm() {
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
    }

    selectRegistr.addEventListener('click', () => {
    registrTel.classList.toggle('active');
    })

    registrTel.addEventListener('click', () => {
    registrTel.classList.remove('active');
    toggleMethodRegistr();
})

inputRegistr.addEventListener('invalid',  () => {
    if (currentMethodRegistr === 'email') {
      inputRegistr.setCustomValidity('Введіть коректний email, наприклад: name@example.com');
    } else {
      inputRegistr.setCustomValidity('Введіть номер телефону у форматі +380...');
    }
    inputRegistr.classList.remove("show-errors");
    void inputRegistr.offsetWidth;
    inputRegistr.classList.add("show-errors");
    })

    inputRegistr.addEventListener('input', () => {
    inputRegistr.setCustomValidity('');
    inputRegistr.classList.remove("show-errors");
})
}

function showPassword() {
    const passwordHiddens = document.querySelectorAll('input[type="password"]');
    const showHiddens = document.querySelectorAll('.show-hidden');

showHiddens.forEach((btn) => {
    btn.addEventListener('click', () => {
    passwordHiddens.forEach((input) => {
    input.type = input.type === 'password' ? 'text' : 'password';
    })
  })
})
}

function searchProduct () {
  const searchInput = document.getElementById('search-input');
  const productCards = document.querySelectorAll('.product-card');
  const searchForm = document.querySelector('.search-form');
  
    searchForm.addEventListener ('submit', (e) => {
    e.preventDefault();
    
    const searchQuery = searchInput.value.toLowerCase();
    
    productCards.forEach(card => {
    const title = card.querySelector('.product-title');
    
    if(!title.textContent.toLowerCase().includes(searchQuery)){
      card.classList.add('hidden');
    }else{
      card.classList.remove('hidden');
    }
  })
    })
  }
   
function initUI() {
  showContacts();
  loginMenu();
  registrMenu();
  burgerMenu();
  loginForm();
  searchProduct ();
  registrForm();
  showPassword();
}

export function initHeader() {
  initUI();
  registrUser();
  loginUser();
  saveUser();
  getFavoritesCount();
  getCompareCount();
  getCartCount();
};


