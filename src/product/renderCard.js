import { addTo } from "../gallery/gallery";
function renderPage () {}
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get('id'));

  fetch('../src/mocks/products.json')
  .then(res => res.json())
  .then(products => {
    const product = products.find(p => p.id === productId);
    const container = document.getElementById('product-container');
    if (product) {
      renderProduct(product);
    } else {
      container.innerHTML = '<p>Товар не знайдено.</p>';
    }
  });

function renderProduct(product) {
  const container = document.getElementById('product-container');
  const page = document.createElement('div');
  page.className = 'product-page';
  page.id = `product-${product.id}`;
  page.setAttribute('attributescope', '');
  page.setAttribute('attributetype', 'https://schema.org/Product');

  page.innerHTML = `
    <div class="product-characteristics">
    <div class="product-img-container">
      <img class="primary-image img" src="${product.image.primary_image}" alt="${product.title}" attributeprop="image" data-index="0">
      <div class="under-image">
        <div class="secondary-images">
          <img src="${product.image.secondary_image}" alt="${product.title}" class="secondary-img img" data-index="1">
          <img src="${product.image.cap_image}" alt="${product.title}" class="secondary-img img" data-index="2">
        </div>
        <div class="action-btn-container">
          <span class="action-btn icon-heart" data-id="${product.id}"><span class="action-btn icon-heart_full" data-id="${product.id}"></span></span>
          <span class="action-btn icon-compare" data-id="${product.id}"></span>
        </div>
      </div>
    </div>
    <div class="product-content">
    <div class="product-info">
      <h3>${product.title}</h3>
      <div class="price">${product.price} грн</div>
    </div>
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
    <div class="product-description">
      <h3 class="description-title">Опис товару</h3>
      <table class="attributes">
        <tbody>
          <tr><td class="attribute-key">Зачicка:</td><td class="attribute-value">${product.attributes.curly}</td></tr>
          <tr><td class="attribute-key">Колip:</td><td class="attribute-value">${product.attributes.color}</td></tr>
          <tr><td class="attribute-key">Довжина:</td><td class="attribute-value">${product.attributes.length}см</td></tr>
          <tr><td class="attribute-key">Густота:</td><td class="attribute-value">${product.attributes.density}%</td></tr>
          <tr><td class="attribute-key">Виробник:</td><td class="attribute-value">${product.attributes.producent}</td></tr>
        </tbody>
      </table>
    </div>
    </div>
    </div>
    <div class="detail-description">${product.detail_description}</div>
     <div class="slider">
      <img src="" class="slide-img">
      <button class="slider-prev"><span class="icon-left"></span></button>
      <button class="slider-next"><span class="icon-right"></span></button>
      <button class="slider-close"><span class="icon-cross"></button>
    </div>
  `;

  container.innerHTML = '';
  container.appendChild(page);

  addTo();
  slideImage();
  selectColor();
}

function slideImage() {
  const galleryImages = document.querySelectorAll('.img');
  const sliderModal = document.querySelector('.slider');
  const mainSlide = document.querySelector('.slide-img');
  const imageList = Array.from(galleryImages).map(img => img.src);
  let currentIndex = 0;

  function updateSlide() {
  mainSlide.src = imageList[currentIndex];
  }

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    updateSlide();
    sliderModal.classList.add('active');
  });
});
document.querySelector('.slider-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  updateSlide();
});

document.querySelector('.slider-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imageList.length;
  updateSlide();
});

document.querySelector('.slider-close').addEventListener('click', () => {
  sliderModal.classList.remove('active');
});
}
 function selectColor() {
const colorTitle = document.querySelector('.color-title');
const mainColorImage = document.querySelector('.main-color-img');
const colorImages = document.querySelectorAll('.color-img');
colorImages.forEach(img =>{
  img.addEventListener('click', () =>{
  mainColorImage.src = img.src;
  colorTitle.textContent = img.title;
  
  colorImages.forEach(img => img.classList.remove('active'));
  img.classList.add('active');
  })
})
}