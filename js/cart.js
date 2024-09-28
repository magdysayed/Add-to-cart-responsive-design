document.addEventListener('DOMContentLoaded', () => { 
    const cartItemsContainer = document.querySelector('.items');
    const totalElement = document.querySelector('.cart-total h3');
    const applyCouponButton = document.querySelector('.apply-coupon');

    // Function to render cart items from local storage
    function renderCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = ''; // Clear existing items

        let total = 0;

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="item-price">Price: $${item.price}</div>
                    <div class="item-size">Size: ${item.size}</div>
                    <div class="item-color">Color: ${item.color}</div>
                    <div class="quantity-control">
                        <button class="decrease" data-name="${item.name}">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity || 1}" data-name="${item.name}" readonly>
                        <button class="increase" data-name="${item.name}">+</button>
                    </div>
                </div>
                <button class="delete" data-name="${item.name}">Delete</button>
            `;

            cartItemsContainer.appendChild(itemElement);
            total += parseFloat(item.price) * (item.quantity || 1); // Calculate total based on price and quantity
        });

        totalElement.innerText = `Total: $${total.toFixed(2)}`;
    }

    // Event delegation for quantity control and delete buttons
    cartItemsContainer.addEventListener('click', (e) => {
        const name = e.target.getAttribute('data-name');
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        if (e.target.classList.contains('delete')) {
            cartItems = cartItems.filter(item => item.name !== name);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCartItems();
        }

        const itemIndex = cartItems.findIndex(item => item.name === name);
        if (itemIndex !== -1) {
            const quantityInput = document.querySelector(`.quantity-input[data-name="${name}"]`);
            let quantity = parseInt(quantityInput.value);

            if (e.target.classList.contains('increase')) {
                quantity++;
            } else if (e.target.classList.contains('decrease')) {
                quantity = Math.max(1, quantity - 1); // Prevent quantity from going below 1
            }

            // Update quantity in the input field
            quantityInput.value = quantity;

            // Update the quantity in the cartItems array
            cartItems[itemIndex].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCartItems(); // Re-render cart to update total
        }
    });

    // Adding new product to the cart
    function addToCart(newItem) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the item already exists based on name and size
        const existingItemIndex = cartItems.findIndex(item => item.name === newItem.name && item.size === newItem.size);

        if (existingItemIndex !== -1) {
            // If item exists, increase the quantity
            cartItems[existingItemIndex].quantity = (cartItems[existingItemIndex].quantity || 1) + 1;
        } else {
            // If item does not exist, add it to the cart
            newItem.quantity = 1; // Initialize quantity
            cartItems.push(newItem);
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCartItems(); // Re-render cart
    }

    // Event listener for the "Apply" button to redirect to delivery.html
    applyCouponButton.addEventListener('click', () => {
        window.location.href = 'delivery.html'; // Redirect to delivery page
    });

    renderCartItems(); // Initial render
});
