import { mockDB } from "../mocks/mockDB";

 export function getFavoritesCount() {
  const currentUser = localStorage.getItem('currentUser') || 'guest';
  const user = mockDB.getUser(currentUser) || {};
  const favorites = Array.isArray(user.favorites) ? user.favorites : [];
  
  const fullFavorites = document.querySelector('.icon.icon-heart_full');
  const countBadge = document.querySelector('.favorites-count');
  
  if(favorites.length > 0){
    fullFavorites.classList.add('active');
  }else{
    fullFavorites.classList.remove('active');
  }
  if(countBadge){
    countBadge.textContent = favorites.length;
  }
  return favorites.length;
}

/* Лiчильник до порiвняння*/

export function getCompareCount() {
  const currentUser = localStorage.getItem('currentUser') || 'guest';
  const user = mockDB.getUser(currentUser) || {};
  const compare = Array.isArray(user.compare) ? user.compare : [];

  const compareFull = document.querySelector('.compare-full');
  const countBadge = document.querySelector('.compare-count');


  
  if(compare.length > 0){
    compareFull.classList.add('active');
  }else{
   compareFull.classList.remove('active');
  }
  if(countBadge){
    countBadge.textContent = compare.length;
  }
  return compare.length;
}

/* Лiчильник до кошика*/

 export function getCartCount() {
  const currentUser = localStorage.getItem('currentUser') || 'guest';
  const user = mockDB.getUser(currentUser) || {};
  const cart = Array.isArray(user.cart) ? user.cart : [];
  
  const cartFull = document.querySelector('.cart-full');
  const countBadge = document.querySelector('.cart-count');

  if(cart.length > 0){
    cartFull.classList.add('active');
  }else{

   cartFull.classList.remove('active');
  }
  if(countBadge){
    countBadge.textContent = cart.length;
  }
  return cart.length;
}

/*Додати до...*/

 export function addTo(){
addToFavorites(mockDB);
addToCompare(mockDB);
addToCart(mockDB);
}

/*Додати до обраних*/

function addToFavorites(mockDB) {
  const currentUser = localStorage.getItem('currentUser') || 'guest';
  const user = mockDB.getUser(currentUser) || { email: currentUser };

  if (!Array.isArray(user.favorites)) user.favorites = [];

  let favorites = user.favorites.map(Number);

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
      const message = document.querySelector('.message');

      if (isActive) {
        if (!favorites.includes(id)) {
          favorites.push(id);
          message.textContent = 'Товар додано до списку обраних';
        }
      } else {
        favorites = favorites.filter(favId => favId !== id);
        message.textContent = 'Товар видалено зi cписку обраних';
      }

      message.classList.add('visible');
      setTimeout(() => message.classList.remove('visible'), 3000);

      user.favorites = favorites;
      mockDB.users.set(currentUser, user);
      mockDB.save();

      localStorage.setItem(key, JSON.stringify(isActive));
      getFavoritesCount();
    });
  });
}



/*Додати до порiвняння*/

function addToCompare(mockDB) {
  const currentUser = localStorage.getItem('currentUser') || 'guest';
  const user = mockDB.getUser(currentUser) || { email: currentUser };

  if (!Array.isArray(user.compare)) user.compare = [];

  let compare = user.compare.map(Number);

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
      const message = document.querySelector('.message');

      if (isActive) {
        if (!compare.includes(id)) {
          compare.push(id);
          message.textContent = 'Товар додано до списку порiвняння';
        }
      } else {
        compare = compare.filter(favId => favId !== id);
        message.textContent = 'Товар видалено зi cписку порiвняння';
      }

      message.classList.add('visible');
      setTimeout(() => message.classList.remove('visible'), 3000);

      user.compare = compare;
      mockDB.users.set(currentUser, user);
      mockDB.save();

      localStorage.setItem(key, JSON.stringify(isActive));
      getCompareCount();
    });
  });
}

/*Додати до кошика*/

function addToCart(mockDB) {
  const currentUser = localStorage.getItem('currentUser') || 'guest';
  const user = mockDB.getUser(currentUser) || { email: currentUser };

  if (!Array.isArray(user.cart)) user.cart = [];

  let cart = user.cart.map(Number);

  document.querySelectorAll('.action-btn.icon-cart').forEach((btn) => {
    const id = parseInt(btn.dataset.id, 10);
    


    btn.addEventListener('click', () => {
      const message = document.querySelector('.message');
      if (!cart.includes(id))
      cart.push(id);
      message.textContent = 'Товар додано до кошика';
      message.classList.add('visible');
      setTimeout(() => message.classList.remove('visible'), 3000);

      user.cart = cart;
      mockDB.users.set(currentUser, user);
      mockDB.save();
      getCartCount();
    });
  });
}
