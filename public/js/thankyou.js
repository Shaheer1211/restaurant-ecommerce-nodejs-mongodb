function appendOrderToken() {
    // Get the URL search parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Extract the 'orderToken' parameter from the URL
    const orderToken = urlParams.get('orderToken');
    
    // Check if the token exists in the URL
    if (orderToken) {
        // Append the orderToken to the element with id 'order-token'
        document.getElementById('order-token').textContent = orderToken;
    } else {
        console.error('Order token not found in the URL');
    }
}

// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', appendOrderToken);
