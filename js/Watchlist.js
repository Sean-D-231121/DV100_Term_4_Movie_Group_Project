$(document).ready(function(){
    $(window).load(function(){
        retrieveLibraryData();
    })
})
retrieveLibraryData = () =>{
  // Retrieve the JSON data from local storage
  const wishlistMovieJSON = localStorage.getItem("wishlistMovie");

  // Check if the data exists in local storage
  if (wishlistMovieJSON) {
    // Parse the JSON data into a JavaScript array of movies
    const wishlist = JSON.parse(wishlistMovieJSON);

    // Loop through the array and display each movie
    wishlist.forEach((movieInfo) => {
      const newRow = `
            <tr class="tableRow">
              <td scope="row">
                <img src="${movieInfo.image}" alt="movie poster" class="img-fluid" style="max-height: 190px;">
              </td>
              <td>${movieInfo.title}</td>
              <td><button class="trailer-btn btn btn-primary btn-sm">Watch Trailer</button></td>
              <td><button class="remove-btn btn btn-danger btn-sm">Remove</button></td>
            </tr>
        `;

      // Append the new row to the table in your template
       $("#table").find("tbody").append(newRow);
    });
  }

  // Add click event listeners for elements with class "remove-btn"
  $(".remove-btn").click(function () {
    // Find the parent row (tr) and remove it
    $(this).closest("tr").remove();
  });
}