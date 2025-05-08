let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function moveCarousel(direction) {
  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }

  const carousel = document.querySelector('.carousel');
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

setInterval(() => moveCarousel(1), 5000);

document.getElementById('cartIcon').addEventListener('click', () => {
  const cart = document.getElementById('cart');
  cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
});

let cartItems = [];
let cartTotal = 0;

function addToCart(name, price) {
  cartItems.push({ name, price });
  cartTotal += price;

  const cartItemsDiv = document.getElementById('cartItems');
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.innerHTML = `
    <span>${name} - R$ ${price.toFixed(2)}</span>
    <button onclick="removeFromCart('${name}', ${price})">Remover</button>
  `;
  cartItemsDiv.appendChild(cartItem);

  document.getElementById('cartTotal').textContent = cartTotal.toFixed(2);
}

function removeFromCart(name, price) {
  cartItems = cartItems.filter(item => item.name !== name);
  cartTotal -= price;

  const cartItemsDiv = document.getElementById('cartItems');
  cartItemsDiv.innerHTML = '';
  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.name} - R$ ${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart('${item.name}', ${item.price})">Remover</button>
    `;
    cartItemsDiv.appendChild(cartItem);
  });

  document.getElementId('cartTotal').textContent = cartTotal.toFixed(2);
}

document.querySelectorAll('.product, .perfume, .promotion').forEach(item => {
  item.addEventListener('click', () => {
    const modal = document.getElementId('productModal');
    const modalTitle = document.getElementId('modalTitle');
    const modalPrice = document.getElementId('modalPrice');
    const modalStars = document.getElementId('modalStars');
    const modalNotes = document.getElementId('modalNotes');
    const modalAddToCart = document.getElementId('modalAddToCart');

    modalTitle.textContent = item.querySelector('h3').textContent;
    modalPrice.textContent = item.querySelector('p').textContent;
    modalStars.textContent = item.querySelector('.stars') ? item.querySelector('.stars').textContent : '';
    modalNotes.textContent = item.querySelector('.notes') ? item.querySelector('.notes').textContent : '';

    modalAddToCart.onclick = () => {
      const name = modalTitle.textContent;
      const priceText = modalPrice.textContent.match(/R\$ (\d+\.\d+)/);
      const price = priceText ? parseFloat(priceText[1]) : 0;
      addToCart(name, price);
      modal.style.display = 'none';
    };

    modal.style.display = 'flex';
  });
});

function closeModal() {
  document.getElementId('productModal').style.display = 'none';
}

document.getElementId('searchInput').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const products = document.querySelectorAll('.product, .perfume, .promotion');

  products.forEach(product => {
    const name = product.querySelector('h3').textContent.toLowerCase();
    product.style.display = name.includes(searchTerm) ? 'block' : 'none';
  });
});

document.getElementId('sortFilter').addEventListener('change', (e) => {
  const sortBy = e.target.value;
  const productContainer = document.getElementId('productContainer');
  const products = Array.from(productContainer.querySelectorAll('.product'));

  if (sortBy === 'price') {
    products.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
  } else if (sortBy === 'stars') {
    products.sort((a, b) => parseFloat(b.dataset.stars) - parseFloat(a.dataset.stars));
  }

  productContainer.innerHTML = '';
  products.forEach(product => productContainer.appendChild(product));
});

document.getElementId('categoryFilter').addEventListener('change', (e) => {
  const category = e.target.value;
  const products = document.querySelectorAll('.product, .perfume, .promotion');

  products.forEach(product => {
    const productCategory = product.dataset.category;
    product.style.display = (category === 'all' || productCategory === category) ? 'block' : 'none';
  });
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  header.classList.toggle('scrolled', window.scrollY > 50);
  nav.classList.toggle('scrolled', window.scrollY > 50);
});