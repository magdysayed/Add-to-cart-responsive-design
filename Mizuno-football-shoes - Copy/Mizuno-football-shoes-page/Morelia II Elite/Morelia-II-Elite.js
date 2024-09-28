const sizes = document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const shoes = document.querySelectorAll('.shoe');
const gradients = document.querySelectorAll('.gradient');
const shoeBg = document.querySelector('.product-background');
let main = document.getElementById('main');
let image = document.querySelector('#imgcard');
const addToCartButton = document.querySelector('.buy');

let prevColor = "purple";
let animationEnd = true;

function ChangeSize() {
    sizes.forEach(size => size.classList.remove('active2'));
    this.classList.add('active2');
}

function ChangeColor() {
    let primary = this.getAttribute('primary');
    let color = this.getAttribute('color');
    let shoe = document.querySelector(`.shoe[color="${color}"]`);
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);

    if (color === prevColor) return;

    colors.forEach(color => color.classList.remove('active1'));
    this.classList.add('active1');

    document.documentElement.style.setProperty('--primary', primary);

    shoes.forEach(s => s.classList.remove('show'));
    shoe.classList.add('show');

    gradients.forEach(g => g.classList.remove('first', 'second'));
    gradient.classList.add('first');
    prevGradient.classList.add('second');

    prevColor = color;
    animationEnd = false;

    gradient.addEventListener('animationEnd', () => {
        animationEnd = true;
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function addToCart() {
    const selectedSize = document.querySelector('.size.active2').textContent;
    const selectedColor = document.querySelector('.color.active1').getAttribute('color');
    const shoeImageSrc = document.querySelector('.shoe.show').src;
    
    // Get the product name and price dynamically
    const productName = document.querySelector('.product-name').textContent;
    const productPrice = parseFloat(document.querySelector('.price h1').textContent.replace('$', '').replace(',', '')); // Convert price to a number

    const product = {
        name: productName, // Dynamic product name
        size: selectedSize,
        color: selectedColor,
        image: shoeImageSrc,
        price: productPrice // Dynamic product price
    };

    // Get existing products from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);

    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show notification
    showNotification('Product added to cart successfully!');
}

// Event listeners
sizes.forEach(size => size.addEventListener('click', ChangeSize));
colors.forEach(color => color.addEventListener('click', ChangeColor));
addToCartButton.addEventListener('click', addToCart);
