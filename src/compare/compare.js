fetch('../src/mocks/products.json')
    .then(res => res.json())
    .then(products => {
      const currentUser = localStorage.getItem('currentUser') || 'guest';
      const mockDB = JSON.parse(localStorage.getItem('mockDB') || '{}');
      const compare = mockDB.users[currentUser].compare.map(Number);

      const container = document.getElementById('main-container');

      const compareProducts = products.filter(p => compare.includes(p.id));
      if (compareProducts.length === 0) {
        container.innerHTML = '<p>Немає товарів до порiвняння 😢</p>';
        return;
        }

      compareProducts.forEach(product => {
        const link = document.createElement('a');
        link.href = '../index.html';
        link.className = 'product-link';
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}"/>
            <div>
            <h3>${product.title}</h3>
            <p>${product.price} грн</p>
            </div>
        `;
        link.appendChild(card)
        container.appendChild(link);
      });
    });