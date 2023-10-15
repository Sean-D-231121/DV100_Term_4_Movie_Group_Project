

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
];
let showMovieInfo = [];
let sortMovies = [];
let getFilter = "allMovies";

$(document).ready(function () {
  getMovieInfo();
  $(window).on("load", function () {
    userName = JSON.parse(localStorage.getItem("Username"));
    console.log(userName);
  });
  showUserName();
});
$(document).ajaxComplete(function () {
  sortMovieData();
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
      checkMovieData = JSON.stringify(movie);

      movieTitle = movie.Title;

      showMovieInfo.push({
        showMovieTitle: movieTitle,
        showMovieImage: moviePoster,
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
    currentCard
      .find("#movie-image")
      .attr("src", displayCards[i].showMovieImage);
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
  console.log(userName);
  $(".username").text(userName);
};

