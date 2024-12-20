let cart;
let subTotal = 0;

function fetchCart() {
  cart = JSON.parse(localStorage.getItem("cart") || "[]");

  cart.forEach((item) => {
    subTotal += item.itemPrice * item.quantity;
  });

  document.getElementById("sub-total").innerText = subTotal;
}

fetchCart();

function placeOrder() {
  const phoneNo = document.getElementById("phoneNo").value;
  const address = document.getElementById("address").value;

  cart = {
    items: cart,
    totalAmount: subTotal,
    phoneNo,
    address,
  };

  // Post the order data to the /api/order endpoint
  fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  })
    .then((response) => response.json())
    .then((data) => {
      // Clear cart from localStorage after successful order
      localStorage.removeItem("cart");

      // Redirect to thank you page
      window.location.href = `/thankyou?orderToken=${data._id}`;
      // Handle failure case (show error message or log error)
    })
    .catch((error) => {
      console.error("Error placing order:", error);
    });
}

document.getElementById("place-order").addEventListener("click", placeOrder);
