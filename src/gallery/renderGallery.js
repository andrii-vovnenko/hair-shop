fetch('../src/mocks/products.json')
  .then(res => res.json())
  .then(products => {
    const container = document.querySelector('.main-grid');
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.id = `product-${product.id}`;
      card.setAttribute('itemscope', '');
      card.setAttribute('itemtype', 'https://schema.org/Product');

      card.innerHTML = `
      <div class="product-image-wrapper">
        <a href="./product.html" data-id="${product.id}" itemprop="url"><img src="${product.image}" alt="${product.title}" itemprop="image" class="product-image default">
        <img src="${product["image-secondary"]}" alt="${product.title}" itemprop="image" class="product-image hover"></a>
      </div>
      <div class="product-info">
      <h3 itemprop="name" class="product-title" ><a href="./product.html" data-id="${product.id}" itemprop="url">${product.title}</a></h3>
      <div class="product-price">
        <span itemprop="price" content="${product.price}" class="product-price">${product.price}грн</span>
      </div>
      <div class="product-description" itemprop="description">${product.description}</div>
      </div>
      <div class="product-actions">
      <button class="action-btn icon-cart" title="Додати до кошика" data-id="${product.id}"></button>
      <button class="action-btn icon-heart" title="Додати до обраних" data-id="${product.id}"><span class="icon-heart_full"></span></button>
      <button class="action-btn icon-compare" title="Порiвняти" data-id="${product.id}"></button>
      </div>
      `;
      container.appendChild(card);
    });
  });
