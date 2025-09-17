import {getCartCount} from '../gallery/gallery.js';
import { mockDB } from '../mocks/mockDB.js';
function cardCreate() {
  fetch('../src/mocks/products.json')
    .then(res => res.json())
    .then(products => {
      const currentUser = localStorage.getItem('currentUser') || 'guest';
      const user = mockDB.getUser(currentUser) || { email: currentUser };
      const cart = Array.isArray(user.cart) ? user.cart.map(Number) : [];
       

      const container = document.getElementById('main-container');
      container.innerHTML = '';
      const cartProducts = products.filter(p => cart.includes(p.id));

      if (cartProducts.length === 0) {
        container.innerHTML = '<p style="font-size: 24px">Ваш кошик пустий...😢</p>';
        return;
      }

      cartProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <button class="remove-btn" data-id="${product.id}" title="Видалити з кошика">
            <span class="icon-cross"></span>
          </button>
          <a href="./cabinet.html"><img src="${product.image}" alt="${product.title}"/></a>
          <div>
            <a href="./cabinet.html"><h3>${product.title}</h3></a>
            <p>${product.price} грн</p>
          </div>
        `;
        container.appendChild(card);
      });
    });
}
function cleanCart(){
document.getElementById('main-container').addEventListener('click', (e) => {
  const btn = e.target.closest('.remove-btn');
  if (!btn) return;

  const id = parseInt(btn.dataset.id, 10);
  const currentUser = localStorage.getItem('currentUser') || 'guest';
  const user = mockDB.getUser(currentUser) || { email: currentUser };


  if (Array.isArray(user.cart)) {
      user.cart = user.cart.filter(p => Number(p) !== id);
      mockDB.users.set(currentUser, user);
      mockDB.save();


    cardCreate();
    getCartCount();
   
    const message = document.querySelector('.message.message-cart');
    if (message) {
      message.textContent = 'Товар видалено з кошика.';
      message.classList.add('visible');
      setTimeout(() => {
        message.classList.remove('visible');
      }, 1500);
    }
  }
});
}

cardCreate();
cleanCart();

