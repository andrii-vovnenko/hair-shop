    const contact = document.querySelector('.contact-menu');
    const contactBtn = document.querySelector('.contact-btn');
    const closeContact = document.querySelector('.close-contact');
    contactBtn.addEventListener('click', () => {
    contact.classList.add('active');
    });
    closeContact.addEventListener('click', () => {
    contact.classList.remove('active');
    });
    const userLogin = document.querySelector('.login-form');
    const accountBtn = document.querySelector('.account-btn');
    accountBtn.addEventListener('click', () => {
    userLogin.classList.toggle('active');
    });
const burgerMenu = document.querySelector('.nav-menu-items');
const burgerBtn = document.querySelector('.burger');
burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('active');
  burgerMenu.classList.toggle('active');
});
document.querySelectorAll('.action-btn.icon-heart').forEach((btn, index) => {
  const id = parseInt(btn.dataset.id, 10);
  const key = `liked-${id}`; // Привязываемся к ID, а не к индексу
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]').map(Number);

  // Инициализация визуального состояния
  if (favorites.includes(id)) {
    btn.classList.add('active');
    localStorage.setItem(key, true); // синхронизируем liked-ID
  }

  btn.addEventListener('click', () => {
    const isActive = btn.classList.toggle('active');
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]').map(Number);

    // Обновляем favorites
    if (isActive) {
      if (!favorites.includes(id)) favorites.push(id);
    } else {
      favorites = favorites.filter(favId => favId !== id);
    }

    // Сохраняем
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem(key, isActive);
  });
});











