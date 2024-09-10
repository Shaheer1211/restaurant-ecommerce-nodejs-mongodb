async function fetchDashboardData() {
  try {
    const response = await fetch("/api/reports");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Extract data from the response
    const totalOrders = data.totalOrders;
    const totalAmount = data.totalAmount;
    const customers = data.customers.length;

    // Display data in the DOM
    document.getElementById("order-div").innerText = totalOrders;
    document.getElementById("income-div").innerText = totalAmount;
    document.getElementById("user-div").innerText = customers;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
}

// Call the function on page load
fetchDashboardData();
