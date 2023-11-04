

let userName;

const movieInformation = [
  {
    imdbId: "tt0083866",
  },
  {
    imdbId: "tt0082971",
  },
  {
    imdbId: "tt0080684",
  },
  {
    imdbId: "tt0087538",
  },
  {
    imdbId: "tt0096895",
  },
  {  
    imdbId: "tt0068646",
  },
  {  
    imdbId: "tt0137523",
  },
  {  
    imdbId: "tt0114369",
  },
  {  
    imdbId: "tt0816692",
  },
  {  
    imdbId: "tt0120689",
  },
  {  
    imdbId: "tt0088763",
  },
  {  
    imdbId: "tt0110357",
  },
  {  
    imdbId: "tt15398776",
  },
  {  
    imdbId: "tt0078748",
  },
  {  
    imdbId: "tt0910970",
  },
  {  
    imdbId: "tt0045152",
  },
  {  
    imdbId: "tt0056592",
  },
  {  
    imdbId: "tt1745960",
  },
  {  
    imdbId: "tt0266697",
  },
  {  
    imdbId: "tt1131734",
  },
  {  
    imdbId: "tt0266543",
  },
  {  
    imdbId: "tt5726616",
  },
  {  
    imdbId: "tt1049413",
  },
  {  
    imdbId: "tt3281548",
  },
  {  
    imdbId: "tt4925292",
  },
  {  
    imdbId: "tt13274016",
  },
  {  
    imdbId: "tt3758542",
  },
  {  
    imdbId: "tt0110912",
  },

];
let showMovieInfo = [];
let sortMovies = [];
let getFilter = "allMovies";
let favMovies = [];

$(document).ready(function () {
  getMovieInfo();
  $(window).on("load", function () {
    userName = JSON.parse(localStorage.getItem("Username"));
    showUserName();
    console.log(userName)
  });
  
});
$(document).ajaxComplete(function () {
  sortMovieData();
  setMovieDataHome(showMovieInfo);
  setMovieDataFav(showMovieInfo,"#favorites")
  
  $(".movie-card").on("click", "#info-url", function () {
    window.location.href =
      "Individual-movie-page.html?id=" +
      $(this).closest("#movie-card-id").attr("value");
      favMovies = showMovieInfo.slice(4, 8);
  });
});
// Get data from OMDB api
getMovieInfo = () => {
  for (let i = 0; i < movieInformation.length; i++) {
    const movieInfo = movieInformation[i].imdbId;
    $.ajax({
      type: "GET",
      url: "http://www.omdbapi.com/?i=" + movieInfo + "&apikey=d7afefce",
      success: function (data) {
        movie = data;
      },
    }).done(function () {
      moviePoster = movie.Poster;
      movieTitle = movie.Title;
      movieGenre = movie.Genre; // Get the genre information
      imdbVotes = parseInt(movie.imdbVotes.replace(/,/g, '')); // Get IMDb votes as an integer//

      showMovieInfo.push({
        movieId: movieInfo,
        showMovieTitle: movieTitle,
        showMovieImage: moviePoster,
        showMovieGenre: movieGenre, // Store the genre information
        imdbVotes: imdbVotes, // Store IMDb votes as an integer//
      });
    });
  }
};


// Make cards for movies
setMovieData = (displayCards) => {
  $("#library-cards-container").empty();
  
  for (let i = 0; i < displayCards.length; i++) {
    $("#library-cards-container").append($("#library-card-temp").html());

    let currentCard = $("#library-cards-container").children().eq(i);
    currentCard.find("#movieTitle").text(displayCards[i].showMovieTitle);
    currentCard.find("#movie-image").attr("src", displayCards[i].showMovieImage);
    currentCard.find("#movie-card-id").attr("value", displayCards[i].movieId);
    currentCard.find("#genreText").text(displayCards[i].showMovieGenre); // Populate the genre
  }
};

//  Make cards for home
 setMovieDataHome = (displayCards) => {
  let homeMovies = displayCards.slice(0,4)
  $("#popular-pic").empty();
   
   for (let i = 0; i < homeMovies.length; i++) {
     $("#popular-pic").append($("#home-card-temp").html());

    let currentCard = $("#popular-pic").children().eq(i);
    currentCard.find("#movieTitle").text(homeMovies[i].showMovieTitle);
    currentCard.find("#movie-image").attr("src", homeMovies[i].showMovieImage);
    currentCard.find("#movie-card-id").attr("value", homeMovies[i].movieId);
     currentCard.find("#genreText").text(homeMovies[i].showMovieGenre); // Populate the genre
   }
 };




 
//  setMovieDataFav = (displayCards,containerFav) => {
//   let favMovies = displayCards.slice(4, 8);
//   console.log(favMovies);
//   $(containerFav).empty();
  
//   for (let i = 0; i < favMovies.length; i++) {
//     $(containerFav).append($("#home-card-temp").html());

//     let currentCard = $(containerFav).children().eq(i);
//     currentCard.find("#movieTitle").text(favMovies[i].showMovieTitle);
//     currentCard.find("#movie-image").attr("src", favMovies[i].showMovieImage);
//     currentCard.find("#movie-card-id").attr("value", favMovies[i].movieId);
//     currentCard.find("#genreText").text(favMovies[i].showMovieGenre); // Populate the genre
    
//   }

 
// };


// Modify the setMovieDataFav function to display top movies by IMDb votes
setMovieDataFav = (displayCards, containerFav) => {
  // Sort the movies by IMDb votes in descending order
  const sortedMovies = displayCards.slice().sort((a, b) => {
    return b.imdbVotes - a.imdbVotes;
  });

  // Select the top movies by IMDb votes (e.g., top 4)
  const topMovies = sortedMovies.slice(0, 4);

  // Clear the container
  $(containerFav).empty();

  // Loop through and display the top movies
  for (let i = 0; i < topMovies.length; i++) {
    $(containerFav).append($("#home-card-temp").html());

    let currentCard = $(containerFav).children().eq(i);
    currentCard.find("#movieTitle").text(topMovies[i].showMovieTitle);
    currentCard.find("#movie-image").attr("src", topMovies[i].showMovieImage);
    currentCard.find("#movie-card-id").attr("value", topMovies[i].movieId);
    currentCard.find("#genreText").text(topMovies[i].showMovieGenre);
    currentCard.find("#imdbVotes").text(topMovies[i].imdbVotes); // Display IMDb votes
  }
};



// Sorter for movies
sortMovieData = () => {
  sortMovies = showMovieInfo.sort((a, b) => {
    if (a.showMovieTitle < b.showMovieTitle) {
      return -1;
    }
    if (a.showMovieTitle > b.showMovieTitle) {
      return 1;
    }
    return 0;
  });
  setMovieData(sortMovies);
};

// Stores username on right side of navbar
showUserName = () => {

  $(".username").text(userName);
};


//FILTERS JAVASCRIPT
$(document).ready(function () {
  // Initially, show all movies
  setMovieData(showMovieInfo);

  // Click handler for "All Movies"
  $("#filter-all-movies").on("click", function () {
    getFilter = "allMovies"; // Reset the filter option to show all movies
    setMovieData(sortMovies);
  });

  // Click handlers for "Genre" filter options
  $("#filter-all-genres").on("click", function () {
    filterMovies("All-Genres");
  });

  $("#filter-action").on("click", function () {
    filterMovies("Action");
  });

  $("#filter-comedy").on("click", function () {
    filterMovies("Comedy");
  });

  $("#filter-drama").on("click", function () {
    filterMovies("Drama");
  });

  $("#filter-sci-fi").on("click", function () {
    filterMovies("Sci-Fi");
  });

  // Click handlers for "Year" filter options
  $("#filter-oldest-newest").on("click", function () {
    filterMovies("Oldest-Newest");
  });

  $("#filter-newest-oldest").on("click", function () {
    filterMovies("Newest-Oldest");
  });

  // Click handlers for "IMDB Score" filter options
  $("#filter-best-worst").on("click", function () {
    filterMovies("Best-Worst");
  });

  $("#filter-worst-best").on("click", function () {
    filterMovies("Worst-Best");
  });

  // Function to apply the filter to movie cards
  function filterMovies(filter) {
    const filteredMovies = showMovieInfo.filter((movie) => {
      if (filter === "All-Genres") {
        return true; // Show all movies
      } else if (filter === "All-Movies") {
        return true; // Show all movies
      } else if (filter === "Best-Worst") {
        return true; // Implement sorting from best to worst IMDb score
      } else if (filter === "Worst-Best") {
        return true; // Implement sorting from worst to best IMDb score
      } else if (filter === "Oldest-Newest") {
        return true; // Implement sorting from oldest to newest year
      } else if (filter === "Newest-Oldest") {
        return true; // Implement sorting from newest to oldest year
      } else {
        // Implement genre filtering
        return movie.showMovieGenre.includes(filter);
      }
    });
    setMovieData(filteredMovies);
  }
});



$(document).ready(function() {
  // Add a click event listener to all elements with the class "remove-btn"
  $(".remove-btn").click(function() {
      // Find the parent row (tr) and remove it
      $(this).closest("tr").remove();
  });
});
