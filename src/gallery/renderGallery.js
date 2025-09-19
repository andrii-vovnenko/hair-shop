import { addTo } from "./gallery";
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
        <a href="./product.html?id=${product.id}" data-id="${product.id}" itemprop="url"><img src="${product.image.primary_image}" alt="${product.title}" itemprop="image" class="product-image default">
        <img src="${product.image.secondary_image}" alt="${product.title}" itemprop="image" class="product-image hover"></a>
      </div>
      <div class="product-info">
      <h3 itemprop="name" class="product-title" ><a href="./product.html?id=${product.id}" data-id="${product.id}" itemprop="url">${product.title}</a></h3>
      <div class="product-price">
        <span itemprop="price" content="${product.price}" class="product-price">${product.price}грн</span>
      </div>
      </div>
      <div class="product-actions">
      <button class="action-btn icon-cart" title="Додати до кошика"></button>
      <button class="action-btn icon-heart" title="Додати до обраних" data-id="${product.id}"><span class="icon-heart_full"></span></button>
      <button class="action-btn icon-compare" title="Порiвняти" data-id="${product.id}"></button>
      </div>
      <div class="product-description" itemprop="description">${product.description}</div>
      <div class="add-to-cart">
       <div class="color-container">
    <div class="main-color">
      <h3>Колiр:<span class="color-title">Чорний</span></h3>
      <img src="${product.color.main}" alt="${product.title}" class="main-color-img">
    </div>
    <div class="color-img-container">
      <img src="${product.color.black.image}" alt="${product.title}" class="black color-img" title="${product.color.black.title}">
      <img src="${product.color.blond.image}" alt="${product.title}" class="blond color-img" title="${product.color.blond.title}">
      <img src="${product.color.red.image}" alt="${product.title}" class="red color-img"title="${product.color.red.title}">
    </div>
    </div>
      <form class="add-to-cart-form">
      <div class="quantity-wrapper">
        <label for="quantity">Кількість:</label>
        <input type="number" id="quantity" name="quantity" min="1" value="1" />
      </div>
      <button type="button" class="cart-button" data-id="${product.id}">Додати до кошика</button>
      </form>
      <button class="close-cart"><span class="icon-cross"></span></button>
      </div>
      `;
      container.appendChild(card);
      selectColor(card);
      showAddTocart(card);
      closeAddToCart(card);
    });
    addTo();
  });
function showAddTocart(card) {
  const fakeCartBtn = card.querySelector('.action-btn.icon-cart');
  const addToCartMenu = card.querySelector('.add-to-cart');

  fakeCartBtn.addEventListener('click', () => {
    addToCartMenu.classList.toggle('active');
  });
}

function selectColor(card) {
const colorTitle = card.querySelector('.color-title');
const mainColorImage = card.querySelector('.main-color-img');
const colorImages = card.querySelectorAll('.color-img');
colorImages.forEach(img =>{
  img.addEventListener('click', () => {
  mainColorImage.src = img.src;
  colorTitle.textContent = img.title;
  
  colorImages.forEach(img => img.classList.remove('active'));
  img.classList.add('active');
  })
})
}
function closeAddToCart(card) {
  const closeBtn = card.querySelector('.close-cart');
  const addToCartMenu = card.querySelector('.add-to-cart');

  closeBtn.addEventListener('click', () => {
    addToCartMenu.classList.remove('active');
  })
}
