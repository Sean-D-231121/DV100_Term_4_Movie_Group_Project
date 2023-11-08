// Define global variables
let userName;
const trailerWatchURL = "https://www.youtube.com/watch?v=";
const trailerEmbedURL = "https://www.youtube.com/embed/";
const imageURL = "https://image.tmdb.org/t/p/original/";
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
     sortMovieData();
      slideItems("#slide-1", 1);
      slideItems("#slide-2", 2);
      slideItems("#slide-3", 3);
      slideInfoInteraction();
     setMovieDataHome(showMovieInfo);
     setMovieDataFav(showMovieInfo, "#favorites");
     slideWishlist();

  }, 1500);
  $(window).on("load", function () {
    userName = JSON.parse(localStorage.getItem("Username"));
    showUserName();
    cardInfoInteraction();
    
     let getMoviesWish = JSON.parse(localStorage.getItem("wishlistMovie"));
     if(getMoviesWish !== null){
      retrieveLibraryData();
     }
       
     
  });

});

// Get movie info by looping through array by using movieTitle
getMovieArrayInfo = (movieTitle,movieArray) =>{
for (let i = 0; i < movieArray.length; i++) {
  const getMovieTitle = movieArray[i];
  if (getMovieTitle.showMovieTitle === movieTitle){
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
    
    // Retrieve the existing wishlist from local storage or create an empty array
    let wishlist = JSON.parse(localStorage.getItem("wishlistMovie")) || [];
    
    let getWishlistMovieInfo = getMovieArrayInfo(movieTitle, showMovieInfo);
    // Create an object to store the information
    if (checkIfInWatchlist(wishlist,getWishlistMovieInfo.movieTMDBId) === false){
      // Add the new movie to the wishlist array
      wishlist.push(getWishlistMovieInfo);
      // Convert the updated wishlist array to a JSON string
      const wishlistJSON = JSON.stringify(wishlist);

      // Store the JSON string in local storage
      localStorage.setItem("wishlistMovie", wishlistJSON);
    }
    
  });
};
// checks whether the ID has already been added to wishlistMovie Array
//  Check for duplicates
checkIfInWatchlist = (wishlistArray,movieId) =>{
  if(wishlistArray.length > 0){
    for (let i = 0; i < wishlistArray.length; i++) {
      const movie = wishlistArray[i];
      // checks if TMDBId and movieId match and returns false if found
      if (movie.movieTMDBId === movieId) {
        return true;
      }
    }
    return false;
  } else{
    return false;
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
              <td>${movieInfo.showMovieGenre}</td>
              <td><button class="remove-btn btn btn-danger btn-sm"></button></td>
            </tr>
        `;

      // Append the new row to the table in your template
       $("#table").find("tbody").append(newRow);
    });
    
  }

  // Remove items from local storage when "Delete button" is clicked
  $(".remove-btn").click(function () {
    
  let tableRow = $(this).closest("tr").index()

  let getCurrentWishList = JSON.parse(localStorage.getItem("wishlistMovie"))

  getCurrentWishList.splice(tableRow, 1)
  let newWishList = JSON.stringify(getCurrentWishList)
  localStorage.setItem("wishlistMovie", newWishList)
  $(this).closest("tr").remove()

});
}
// displays a movie new movie based on the slideId and index put in
function slideItems (slideId, index){
  const newest = showMovieInfo.slice().sort((a, b) => b.showYear - a.showYear);
  const newestMovie = newest[index];
   $(slideId).css(
     "background-image",
     "url(" + newestMovie.showBackdropImage + ")"
   );
  $(slideId).find(".slideName").text(newestMovie.showMovieTitle);
  $(slideId).find(".slideRating").text("Rating: " + newestMovie.showImdbRating);
  $(slideId).find(".slideDirector").text("Director: " + newestMovie.showDirector);
  $(slideId).find(".id-container").attr("value", newestMovie.movieTMDBId);

}
// adds to wishlist from when pressing on watchlist button on home page slider
function slideWishlist(){
  // Add click event listener for "wishlist-button"
  $(".wishlist-button-slide").on("click",function () {
    const movieTitle = $(this)
      .closest(".carousel-item")
      .find(".slideName")
      .text();
    
    

    // Retrieve the existing wishlist from local storage or create an empty array
    let wishlist = JSON.parse(localStorage.getItem("wishlistMovie")) || [];

    let getWishlistMovieInfo = getMovieArrayInfo(movieTitle, showMovieInfo);
    // Create an object to store the information
    if (
      checkIfInWatchlist(wishlist, getWishlistMovieInfo.movieTMDBId) === false
    ) {
      // Add the new movie to the wishlist array
      wishlist.push(getWishlistMovieInfo);
      // Convert the updated wishlist array to a JSON string
      const wishlistJSON = JSON.stringify(wishlist);

      // Store the JSON string in local storage
      localStorage.setItem("wishlistMovie", wishlistJSON);
    }
  });
}
function slideInfoInteraction() {
  $(".info-button-slide").click(function () {
    window.location.href =
      "Individual-movie-page.html?id=" +
      $(this).closest(".id-container").attr("value");
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
      url: "https://www.omdbapi.com/?i=" + movieInfo + "&apikey=d7afefce",
      success: function (data) {
        movie = data;
      },
    }).done(function () {
      moviePoster = movie.Poster;
      movieTitle = movie.Title;
      movieGenre = movie.Genre; // Get the genre information
      imdbRating = movie.imdbRating;
      boxOffice = movie.BoxOffice;
      director = movie.Director;
      showMovieInfo.push({
        movieOMDBId: movieInformation[i].imdbId,
        movieTMDBId: movieInformation[i].moviedbId,
        showMovieTitle: movieTitle,
        showMovieImage: moviePoster,
        showMovieGenre: movieGenre, // Store the genre information
        showImdbRating: +imdbRating,
        showBoxOffice: boxOffice,
        showDirector: director,
        showYear: movie.Year,
        plot: movie.Plot,
        runtime: movie.Runtime,
        showTrailerEmbed: "",
        showTrailerWatch: "",
        showBackdropImage: "",
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
        getTMDBId : movieDBLog.id,
        getTMDBName : movieDBLog.original_title,
        showTrailerEmbed: trailerEmbedURL + movieDBLog.videos.results[0].key,
        showTrailerWatch: trailerWatchURL + movieDBLog.videos.results[0].key,
        showBackdropImage: imageURL + movieDBLog.images.backdrops[0].file_path,
      });
      
    });
  }
}

// Join the data between OMDB and TMDB
function joinAPIData() {
  for (let i = 0; i < showMovieInfo.length; i++) {
    const movie = showMovieInfo[i];
    for (let j = 0; j < getTMDBInfo.length; j++) {
      const movieTwo = getTMDBInfo[j];
      if(+movie.movieTMDBId === movieTwo.getTMDBId){
          movie.showTrailerEmbed = getTMDBInfo[j].showTrailerEmbed;
          movie.showTrailerWatch = getTMDBInfo[j].showTrailerWatch;
          movie.showBackdropImage = getTMDBInfo[j].showBackdropImage;
      }
    }
  
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

  let getHomeMovies = (filteredMovies = displayCards
    .slice()
    .sort((a, b) => a.showYear - b.showYear));
    let homeMovies = getHomeMovies.slice(0,4);
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

// Modify the setMovieDataFav function to display top movies by IMDb votes
setMovieDataFav = (displayCards, containerFav) => {
  // Sort the movies by IMDb votes in descending order
  const sortedMovies = displayCards.slice().sort((a, b) => {
    return b.showImdbRating - a.showImdbRating;
  });
 
  // Select the top movies by IMDb votes (e.g., top 4)
  const topMovies = sortedMovies.slice(0,4);
  // Clear the container
  $(containerFav).empty();

  // Loop through and display the top movies
  for (let i = 0; i < topMovies.length; i++) {
    $(containerFav).append($("#home-card-temp").html());

    let currentCard = $(containerFav).children().eq(i);
    currentCard.find("#movieTitle").text(topMovies[i].showMovieTitle);
    currentCard.find("#movie-image").attr("src", topMovies[i].showMovieImage);
    currentCard.find("#movie-card-id").attr("value", topMovies[i].movieTMDBId);
    currentCard.find("#genreText").text(topMovies[i].showMovieGenre);
    currentCard.find("#yearText").text(topMovies[i].showYear);
    currentCard.find("#rating-card").text(topMovies[i].showImdbRating);
    
    cardInfoInteraction();
    addToWishlistFunction();
  }
  
};



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

// ...

// Filter JavaScript
$(document).ready(function () {
  // Initially, show all movies
 

  // Click handler for "All Movies"
  $("#filter-all-movies").on("click", function () {
    filterMovies("All-Movies");
  });

  // Click handlers for "Genre" filter options
  $(".dropdown-option").on("click", function () {
    const filter = $(this).attr("data-filter");
    filterMovies(filter);
  });

  // Click handlers for "IMDB Score" filter options
  $("#filter-best-worst").on("click", function () {
    filterMovies("Best-Worst");
  });

  $("#filter-worst-best").on("click", function () {
    filterMovies("Worst-Best");
  });

  // Click handlers for "Year" filter options
  $("#filter-oldest-newest").on("click", function () {
    filterMovies("Oldest-Newest");
  });

  $("#filter-newest-oldest").on("click", function () {
    filterMovies("Newest-Oldest");
  });

  // Function to apply the filter to movie cards
  function filterMovies(filter) {
    let filteredMovies = [];

    if (filter === "All-Movies") {
      // Show all movies
      filteredMovies = showMovieInfo.slice();
    } else if (filter === "All-Genres") {
      // Show all movies, no genre filter
      filteredMovies = showMovieInfo.slice();
    } else if (filter === "Best-Worst") {
      // Sort by IMDb score from highest to lowest
      filteredMovies = showMovieInfo.slice().sort((a, b) => b.showImdbRating - a.showImdbRating);
    } else if (filter === "Worst-Best") {
      // Sort by IMDb score from lowest to highest
      filteredMovies = showMovieInfo.slice().sort((a, b) => a.showImdbRating - b.showImdbRating);
    } else if (filter === "Oldest-Newest") {
      // Sort by year from oldest to newest
      filteredMovies = showMovieInfo.slice().sort((a, b) => a.showYear - b.showYear);
    } else if (filter === "Newest-Oldest") {
      // Sort by year from newest to oldest
      filteredMovies = showMovieInfo.slice().sort((a, b) => b.showYear - a.showYear);
    } else {
      // Filter by genre
      filteredMovies = showMovieInfo.filter((movie) =>
        movie.showMovieGenre.includes(filter)
      );
    }

    setMovieData(filteredMovies);
  }
});
