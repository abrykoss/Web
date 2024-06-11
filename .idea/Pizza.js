// Get the count buttons
const countButtons = document.querySelectorAll('.order-item .count button');

// Add event listeners to the count buttons
countButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the parent count element
        const countElement = button.parentElement;

        // Get the current count value
        let count = parseInt(countElement.querySelector('span').textContent);

        // Increment or decrement the count
        if (button.textContent === '+') {
            count++;
        } else {
            count--;
        }

        // Update the count value
        countElement.querySelector('span').textContent = count;

        // Update the price
        updatePrice(countElement.parentElement);
    });
});

// Function to update the price
function updatePrice(orderItem) {
    // Get the price elements
    const priceElements = orderItem.querySelectorAll('.price span');

    // Get the count value
    const count = parseInt(orderItem.querySelector('.count span').textContent);

    // Calculate the price
    const price = count * parseInt(priceElements[1].textContent);

    // Update the price value
    orderItem.querySelector('span').textContent = price + 'грн';

    // Update the total price
    updateTotal();
}

// Function to update the total price
function updateTotal() {
    // Get all the order items
    const orderItems = document.querySelectorAll('.order-item');

    // Calculate the total price
    let totalPrice = 0;
    orderItems.forEach(orderItem => {
        totalPrice += parseInt(orderItem.querySelector('span').textContent);
    });

    // Update the total price value
    document.querySelector('.total span').textContent = totalPrice + ' грн';
}