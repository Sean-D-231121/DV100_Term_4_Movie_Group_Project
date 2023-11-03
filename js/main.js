// Define global variables
let userName;
const trailerWatchURL = "https://www.youtube.com/watch?v=";
const trailerEmbedURL = "https://www.youtube.com/embed/";
const movieInformation = [
  {
    imdbId: "tt0083866",
    moviedbId: "601",
  },
  {
    imdbId: "tt0082971",
    moviedbId: "85"
  },
  {
    imdbId: "tt0080684",
    moviedbId: "1891"
  },
  {
    imdbId: "tt0087538",
    moviedbId:  "1885"
  },
  {
    imdbId: "tt0096895",
    moviedbId: "268"
  },
  {  
    imdbId: "tt0068646",
    moviedbId: "238"
  },
  {  
    imdbId: "tt0137523",
    moviedbId: "550"
  },
  {  
    imdbId: "tt0114369",
    moviedbId: "807"
  },
  {  
    imdbId: "tt0816692",
    moviedbId: "157336"
  },
  {  
    imdbId: "tt0120689",
    moviedbId: "497"
  },
  {  
    imdbId: "tt0088763",
    moviedbId: "105"
  },
  {  
    imdbId: "tt0110357",
    moviedbId: "105"
  },
  {  
    imdbId: "tt15398776",
    moviedbId: "872585"
  },
  {  
    imdbId: "tt0078748",
    moviedbId:  "348"
  },
  {  
    imdbId: "tt0910970",
    moviedbId: "10681"
  },
  {  
    imdbId: "tt0045152",
    moviedbId: "872"
  },
  {  
    imdbId: "tt0056592",
    moviedbId: "595"
  },
  {  
    imdbId: "tt1745960",
    moviedbId: "361743"
  },
  {  
    imdbId: "tt0266697",
    moviedbId: "24"
  },
  {  
    imdbId: "tt1131734",
    moviedbId: "19994"
  },
  {  
    imdbId: "tt0266543",
    moviedbId: "12"
  },
  {  
    imdbId: "tt5726616",
    moviedbId: "398818"
  },
  {  
    imdbId: "tt1049413",
    moviedbId: "14160"
  },
  {  
    imdbId: "tt3281548",
    moviedbId: "331482"
  },
  {  
    imdbId: "tt4925292",
    moviedbId: "391713"
  },
  {  
    imdbId: "tt13274016",
    moviedbId: "866463"
  },
  {  
    imdbId: "tt3758542",
    moviedbId: "365620"
  },
  {  
    imdbId: "tt0110912",
    moviedbId: "680"
  },
];

let showMovieInfo = [];
let getOMDBInfo = [];
let getTMDBInfo = [];
let sortMovies = [];
let getFilter = "allMovies";
let moviePoster;
let movieTitle;
let movieGenre;
let imdbRating;
let favMovies = [];

// Document ready function
$(document).ready(function () {
  getMovieInfo();
  getTMDBMovieInfo();
  
  setTimeout(function () {
    joinAPIData();
    
  }, 2000);
  $(window).on("load", function () {
    userName = JSON.parse(localStorage.getItem("Username"));
    showUserName();
    console.log(userName);
    cardInfoInteraction();
     let getMoviesWish = JSON.parse(localStorage.getItem("wishlistMovie"));
     if(getMoviesWish !== null){
      retrieveLibraryData();
     }
       
     
  });

  $(document).ajaxComplete(function () {
    sortMovieData();
    setMovieDataHome(showMovieInfo);
    setMovieDataFav(showMovieInfo, "#favorites");
  });





  
  
});
getMovieArrayInfo = (movieTitle,movieArray) =>{
for (let i = 0; i < movieArray.length; i++) {
  const getMovieTitle = movieArray[i];
  console.log(getMovieTitle);
  if (getMovieTitle.showMovieTitle === movieTitle){
    console.log("found")
    return getMovieTitle
  }
  
}

}
addToWishlistFunction = () => {
  // Add click event listener for "wishlist-button"
  $(".wishlist-button").click(function () {
    const movieTitle = $(this)
      .closest(".movie-card")
      .find("#movieTitle")
      .text();
    console.log(movieTitle);
    // Retrieve the existing wishlist from local storage or create an empty array
    let wishlist = JSON.parse(localStorage.getItem("wishlistMovie")) || [];
    
    let getWishlistMovieInfo = getMovieArrayInfo(movieTitle, showMovieInfo);
    // Create an object to store the information
    if (checkIfInWatchlist(wishlist,getWishlistMovieInfo.movieTMDBId) === true){
      // Add the new movie to the wishlist array
      wishlist.push(getWishlistMovieInfo);
      console.log(wishlist)
      // Convert the updated wishlist array to a JSON string
      const wishlistJSON = JSON.stringify(wishlist);

      // Store the JSON string in local storage
      localStorage.setItem("wishlistMovie", wishlistJSON);
    }
    
  });

  
};
// checks whether the ID has already been added to wishlistMovie Array
checkIfInWatchlist = (wishlistArray,movieId) =>{
  if(wishlistArray.length > 0){
    for (let i = 0; i < wishlistArray.length; i++) {
      const movie = wishlistArray[i];
      if (movie.movieTMDBId === movieId) {
        return false;
      }
    }
    return true;
  } else{
    return true;
  }
  
}

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
                <img src="${movieInfo.showMovieImage}" alt="movie poster" class="img-fluid" style="max-height: 190px;">
              </td>
              <td>${movieInfo.showMovieTitle}</td>
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
// Function to handle card information interaction
function cardInfoInteraction() {
  $(".movie-card").on("click", "#info-url", function () {
    window.location.href =
      "Individual-movie-page.html?id=" +
      $(this).closest("#movie-card-id").attr("value");
  });
}

// Get data from OMDB API
function getMovieInfo() {
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
      imdbRating = movie.imdbRating;
      boxOffice = movie.BoxOffice;
      showMovieInfo.push({
        movieOMDBId: movieInformation[i].imdbId,
        movieTMDBId: movieInformation[i].moviedbId,
        showMovieTitle: movieTitle,
        showMovieImage: moviePoster,
        showMovieGenre: movieGenre, // Store the genre information
        showImdbRating: +imdbRating,
        showBoxOffice: boxOffice,
        showYear: movie.Year,
        plot: movie.Plot,
        runtime: movie.Runtime,
        showTrailerEmbed: "",
        showTrailerWatch: "",
      });
    });
  }
}

// Get The Movie Database data
function getTMDBMovieInfo() {
  for (let i = 0; i < movieInformation.length; i++) {
    $.ajax({
      type: "GET",
      url:
        "https://api.themoviedb.org/3/movie/" +
        movieInformation[i].moviedbId +
        "?api_key=b73d45f4cde3956c846eaca8f95d17d8&append_to_response=videos,images",
      success: function (data) {
        movieDBLog = data;
      },
    }).done(function () {
      getTMDBInfo.push({
        showTrailerEmbed: trailerEmbedURL + movieDBLog.videos.results[0].key,
        showTrailerWatch: trailerWatchURL + movieDBLog.videos.results[0].key,
      });
    });
  }
}

// Join the data between OMDB and TMDB
function joinAPIData() {
  for (let i = 0; i < movieInformation.length; i++) {
    const movie = showMovieInfo[i];
    movie.showTrailerEmbed = getTMDBInfo[i].showTrailerEmbed;
    movie.showTrailerWatch = getTMDBInfo[i].showTrailerWatch;
  }
  
}

// Make cards for movies
function setMovieData(displayCards) {
  $("#library-cards-container").empty();

  for (let i = 0; i < displayCards.length; i++) {
    $("#library-cards-container").append($("#library-card-temp").html());

    let currentCard = $("#library-cards-container").children().eq(i);
    currentCard.find("#movieTitle").text(displayCards[i].showMovieTitle);
    currentCard.find("#movie-image").attr("src", displayCards[i].showMovieImage);
    currentCard.find("#movie-card-id").attr("value", displayCards[i].movieTMDBId);
    currentCard.find("#genreText").text(displayCards[i].showMovieGenre); // Populate the genre
    currentCard.find("#yearText").text(displayCards[i].showYear);
    currentCard.find("#rating-card").text(displayCards[i].showImdbRating);
  }
  cardInfoInteraction();
  addToWishlistFunction();
}

// Make cards for home
function setMovieDataHome(displayCards) {
  let homeMovies = displayCards.slice(0, 4);
  $("#popular-pic").empty();

  for (let i = 0; i < homeMovies.length; i++) {
    $("#popular-pic").append($("#home-card-temp").html());

    let currentCard = $("#popular-pic").children().eq(i);
    currentCard.find("#movieTitle").text(homeMovies[i].showMovieTitle);
    currentCard.find("#movie-image").attr("src", homeMovies[i].showMovieImage);
    currentCard.find("#movie-card-id").attr("value", homeMovies[i].movieTMDBId);
    currentCard.find("#genreText").text(homeMovies[i].showMovieGenre); // Populate the genre
      currentCard.find("#yearText").text(homeMovies[i].showYear);
      currentCard.find("#rating-card").text(homeMovies[i].showImdbRating);
  }
}

// Set cards for favorites
function setMovieDataFav(displayCards, containerFav) {
  let favMovies = displayCards.slice(4, 8);

  $(containerFav).empty();

  for (let i = 0; i < favMovies.length; i++) {
    $(containerFav).append($("#home-card-temp").html());

    let currentCard = $(containerFav).children().eq(i);
    currentCard.find("#movieTitle").text(favMovies[i].showMovieTitle);
    currentCard.find("#movie-image").attr("src", favMovies[i].showMovieImage);
    currentCard.find("#movie-card-id").attr("value", favMovies[i].movieTMDBId);
    currentCard.find("#genreText").text(favMovies[i].showMovieGenre); // Populate the genre
    currentCard.find("#yearText").text(favMovies[i].showYear);
    currentCard.find("#rating-card").text(favMovies[i].showImdbRating);
  }
  cardInfoInteraction();
}

// Sorter for movies
function sortMovieData() {
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
}

// Stores username on the right side of the navbar
function showUserName() {
  $(".username").text(userName);
}

// Filter JavaScript
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

  // ... Add similar click handlers for other genres

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
