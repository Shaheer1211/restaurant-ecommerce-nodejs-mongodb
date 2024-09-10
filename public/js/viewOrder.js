$(document).ready(function () {
    const pathArray = window.location.pathname.split("/");
    const orderId = pathArray[pathArray.length - 1];  // Extract categoryId from the path

    // Function to fetch and display order data
    function fetchOrderDetails(orderId) {
        $.ajax({
            url: `/api/order/${orderId}`,
            type: 'GET',
            success: function (data) {
                // Populate order token and total amount
                $('#order-token').text(data._id);
                $('#total-amount').text(`RS - ${data.totalAmount}`);
                console.log(data.status)
                // Populate order status
                $('select[name="status"]').val(data.status);

                // Populate address
                $('#order-address').text(data.address);

                // Populate order items
                const orderItemsContainer = $('#order-items');
                orderItemsContainer.empty(); // Clear previous items
                data.items.forEach(item => {
                    const menuItem = item.menuItemId;
                    orderItemsContainer.append(`
                        <div class="grid grid-cols-3 gap-4">
                            <div class="flex gap-4">
                                <h4 class="text-[#990100]">Item Name:</h4>
                                <p>${menuItem.name}</p>
                            </div>
                            <div class="flex gap-4">
                                <h4 class="text-[#990100]">Per Price:</h4>
                                <p>RS - ${menuItem.price}</p>
                            </div>
                            <div class="flex gap-4">
                                <h4 class="text-[#990100]">Quantity:</h4>
                                <p>${item.quantity}</p>
                            </div>
                        </div>
                    `);
                });
            },
            error: function (error) {
                console.error("Error fetching order data:", error);
            }
        });
    }

    // Call the function to fetch and display the order details
    fetchOrderDetails(orderId);

    // Update order status
    $('#category-form').on('submit', function (e) {
        e.preventDefault();

        const updatedStatus = $('select[name="status"]').val();
        
        $.ajax({
            url: `/api/order/${orderId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ status: updatedStatus }),
            success: function (response) {
                alert('Order status updated successfully');
            },
            error: function (error) {
                console.error("Error updating order status:", error);
            }
        });
    });
});
