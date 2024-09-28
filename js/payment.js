document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.items');

    // Fetch cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the items container first
    cartItemsContainer.innerHTML = '<h3>Items in Your Cart</h3>';

    let totalPrice = 0; // Variable to store the total price

    // Iterate over cart items and create HTML for each item
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        const itemPrice = parseFloat(item.price) * (item.quantity || 1);

        // Check if the image path is valid and add a fallback image if not
        const imagePath = item.img ? item.img : 'path/to/default-image.jpg'; // Replace with a fallback image if needed

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="product-image">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Size: ${item.size}</p>
                <p>Color: ${item.color}</p>
                <p>Price: $${item.price}</p>
                <p class="item-quantity">Quantity: ${item.quantity || 1}</p>
            </div>
        `;

        // Append the item to the container
        cartItemsContainer.appendChild(itemElement);

        // Update the total price
        totalPrice += itemPrice;
    });

    // Create an element to display the total price
    const totalPriceElement = document.createElement('div');
    totalPriceElement.classList.add('total-price');
    totalPriceElement.innerHTML = `<h3>Total Price: $${totalPrice.toFixed(2)}</h3>`;

    // Append total price at the end of cart items
    cartItemsContainer.appendChild(totalPriceElement);

    // Handle the form submission with confirmation step
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Show a confirmation dialog with the total price
        const userConfirmed = confirm(`Are you sure you want to pay $${totalPrice.toFixed(2)}?`);

        if (userConfirmed) {
            // If user clicks "Yes", navigate to confirmation page
            window.location.href = 'confirmation.html';
        } else {
            // If user clicks "No", stay on the payment page
            alert('You have cancelled the payment.');
        }
    });
});
