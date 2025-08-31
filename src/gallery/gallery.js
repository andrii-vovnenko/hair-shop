
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











