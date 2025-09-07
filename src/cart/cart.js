fetch('../src/mocks/products.json')
  .then(res => res.json())
  .then(products => {
    const currentUser = localStorage.getItem('currentUser') || 'guest';
    const mockDB = JSON.parse(localStorage.getItem('mockDB') || '{}');
    const cart = mockDB.users?.[currentUser]?.cart?.map(Number) || [];

    const container = document.getElementById('main-container');
    const cartProducts = products.filter(p => cart.includes(p.id));

    if (cartProducts.length === 0) {
      container.innerHTML = '<p>Ваш кошик пустий 😢</p>';
      return;
    }

    cartProducts.forEach(product => {
      const link = document.createElement('a');
      link.href = '';
      link.className = 'product-link';

      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <button class="remove-btn" data-id="${product.id}" title="Видалити з кошика">
          <span class="icon-cross"></span>
        </button>
        <img src="${product.image}" alt="${product.title}"/>
        <div>
          <h3>${product.title}</h3>
          <p>${product.price} грн</p>
        </div>
      `;

      
      card.querySelector('.remove-btn').addEventListener('click', () => {
        const id = parseInt(product.id, 10);
        const mockDB = JSON.parse(localStorage.getItem('mockDB') || '{}');
        const currentUser = localStorage.getItem('currentUser') || 'guest';

        if (mockDB.users?.[currentUser]?.cart) {
          mockDB.users[currentUser].cart = mockDB.users[currentUser].cart.filter(item => item !== id);
          localStorage.setItem('mockDB', JSON.stringify(mockDB));
        }
      });

      link.appendChild(card);
      container.appendChild(link);
    });
  });
