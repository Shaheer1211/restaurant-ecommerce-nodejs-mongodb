$(document).ready(function () {
    // Extract the query parameter (menuItemId) from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const menuItemId = urlParams.get('id'); // Assuming 'id' is the query parameter
    
    if (menuItemId) {
        console.log(`Fetching data for menuItemId: ${menuItemId}`);
        
        // Call the API using the extracted menuItemId
        fetch(`/api/menuItem/${menuItemId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Log the response data to ensure it's correct
                console.log(data);

                // Update the modal with the API data
                document.querySelector('img').src = data.image;
                document.querySelector('h2').textContent = data.name;
                document.querySelector('p').textContent = data.description;
                document.getElementById('main-total-price').textContent = `RS ${data.price}`;
            })
            .catch(error => {
                console.error("There was an error with the API call:", error);
            });
    } else {
        console.log("No menuItemId found in the URL");
    }
});
