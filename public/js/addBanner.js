$(document).ready(function() {
    $('#banner-form').on('submit', function(e) {
      e.preventDefault(); // Prevent default form submission
  
      // Create FormData object to handle file and text inputs
      const formData = new FormData(this);
  
      $.ajax({
        url: '/api/banner', // Your API endpoint
        type: 'POST', // HTTP method
        data: formData, // Data to be sent (FormData object)
        processData: false, // Required to send FormData object correctly
        contentType: false, // Set to false to let the browser set it automatically
        success: function(response) {
          alert('Banner uploaded successfully!');
          // Optionally, reload the page or reset the form
          $('#banner-form')[0].reset();
          window.location = '/admin/banners'
        },
        error: function(xhr, status, error) {
          alert('Error uploading banner: ' + xhr.responseText);
        }
      });
    });
  });
  