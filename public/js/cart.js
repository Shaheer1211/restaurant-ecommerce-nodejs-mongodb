function fetchCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');

    // Fetch cart from localStorage or set to empty array if it doesn't exist
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Clear any existing items in the cart container
    cartItemsContainer.innerHTML = '';

    // Check if the cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-gray-500">Your cart is empty.</p>';
        return;
    }

    let total = 0;

    // Loop through the cart and generate the HTML for each item
    cart.forEach(item => {
        total += item.itemPrice * item.quantity
        const cartItemHTML = `
            <div class="flex justify-between rounded-xl w-full p-4 mt-5 border border-[#990100] bg-white">
              <div class="flex">
                <div>
                  <img class="w-24 h-24" src="${item.itemImg}" alt="${item.itemName}" />
                </div>
                <div class="ml-2">
                  <p class="text-xl font-medium">${item.itemName}</p>
                  <p class="text-xl font-medium">${item.quantity} pcs</p>
                  <p class="text-xl font-medium">RS ${item.itemPrice}</p>
                </div>
              </div>
              <div class="lg:mr-3 flex flex-col justify-center items-center">
                <!-- delete btn -->
                <button onclick="removeCartItem('${item.id}')">
                  <svg
                    class="fill-red-600 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
        `;

        // Append each cart item to the container
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        setTotalAmount(total)
    });
}

// Function to remove an item from the cart
function removeCartItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Filter out the item with the given ID
    cart = cart.filter(item => item.id !== itemId);

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-fetch and update the cart display
    fetchCartItems();
}

function setTotalAmount(totalAmount) {
    let subTotal = document.getElementById('sub-total')

    subTotal.innerText = totalAmount
}

// Call the function to fetch and display the cart items
fetchCartItems();

document.getElementById('checkout-btn').addEventListener('click', function (){
    // let totalAmount = document.getElementById('sub-total').innerText

    // let cart = JSON.parse(localStorage.getItem('cart'));

    // let items = cart.map((item) => ({
    //     menuItemId: item.id,
    //     quantity: item.quantity
    // }))

    // localStorage.setItem('cart', JSON.stringify({items, totalAmount}))

    window.location = '/checkout'
})