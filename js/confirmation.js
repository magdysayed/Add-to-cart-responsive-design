document.addEventListener('DOMContentLoaded', () => {
    const doneButton = document.querySelector('.done');
    const orderDetailsContainer = document.querySelector('#order-details');
    const searchInput = document.querySelector('#search-input');
    const totalAmountElement = document.querySelector('#total-amount h3');

    // Function to render items from local storage
    function renderOrderDetails() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Get items from local storage
        const itemMap = {}; // Create a map to group items by name
        orderDetailsContainer.innerHTML = ''; // Clear existing items
        let total = 0;

        // Group items by name and sum their quantities
        cartItems.forEach(item => {
            if (itemMap[item.name]) {
                itemMap[item.name].quantity += item.quantity; // Increase quantity if the item already exists
            } else {
                itemMap[item.name] = { ...item }; // Copy item to map
                itemMap[item.name].quantity = item.quantity; // Initialize quantity
            }
        });

        // Render items in the order details
        Object.values(itemMap).forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <div class="item-price">$${item.price}</div>
                    <div class="quantity">Quantity: ${item.quantity}</div>
                </div>
            `;
            orderDetailsContainer.appendChild(itemElement);
            // Calculate total price
            total += parseFloat(item.price) * item.quantity; // Update total calculation
        });

        // Update total amount
        totalAmountElement.innerText = `Total Amount: $${total.toFixed(2)}`;
    }

    // Render order details on page load
    renderOrderDetails();

    // Event listener for done button
    doneButton.addEventListener('click', () => {
        alert('Thank you for your order! You will receive a confirmation email shortly.');
        // Redirect to the home page or another section if needed
        window.location.href = ''; // Adjust the link as necessary
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const items = document.querySelectorAll('#order-details .item');

        items.forEach(item => {
            const itemName = item.querySelector('h4').textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.style.display = ''; // Show item
            } else {
                item.style.display = 'none'; // Hide item
            }
        });
    });
});
