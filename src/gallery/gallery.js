function getMockDB() {
  return JSON.parse(localStorage.getItem('mockDB') || '{}');
}

function getFavoritesCount() {
  const currentUser = localStorage.getItem('currentUser') || 'guest';
  const mockDB = JSON.parse(localStorage.getItem('mockDB') || '{}');
  const emptyFavorites = document.querySelector('.icon-heart');
  const fullFavorites = document.querySelector('.icon-heart_full');

  const favorites = mockDB?.users?.[currentUser]?.favorites || [];
  if(favorites.length > 0){
    emptyFavorites.classList.remove('active');
    fullFavorites.classList.add('active');
  }else{
    emptyFavorites.classList.add('active');
    fullFavorites.classList.remove('active');
  }
  return favorites.length;
}

function saveMockDB(db) {
  localStorage.setItem('mockDB', JSON.stringify(db));
}
function addToFavorites(mockDB) {
  const currentUser = localStorage.getItem('currentUser') || 'guest';

  if (!mockDB.users) mockDB.users = {};
  if (!mockDB.users[currentUser]) mockDB.users[currentUser] = { favorites: [] };

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
function addToCompare(mockDB) {
  const currentUser = localStorage.getItem('currentUser') || 'guest';

  if (!mockDB.users) mockDB.users = {};
  if (!mockDB.users[currentUser]) mockDB.users[currentUser] = { compare: [] };

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
    });
  });
}
const mockDB = getMockDB();
addToFavorites(mockDB);
addToCompare(mockDB);
