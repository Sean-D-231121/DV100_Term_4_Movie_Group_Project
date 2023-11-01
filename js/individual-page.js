const individualTrailerWatchURL = "https://www.youtube.com/watch?v=";
const individualTrailerEmbedURL = "https://www.youtube.com/embed/";
let individualInfo ;
const imagePath = "https://image.tmdb.org/t/p/original/";
$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  if (movieId) {
    getIndividualMovie(movieId);
  } else {
    console.log("Not Working");
  }
});
getIndividualMovie = (id) => {
  const getIndividualMovieUrl =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=b73d45f4cde3956c846eaca8f95d17d8&append_to_response=videos,images";
  let getImdbId;
  $.ajax({
    type: "GET",
    datatype: "json",
    url: getIndividualMovieUrl,
    success: function (data) {
      const movie = data;
      console.log(movie);
      getImdbId = movie.imdb_id;
      $(".singel-movie").attr("src", imagePath + movie.poster_path);
      $("#individual-title").text(movie.original_title);
      $("#individual-trailer-link").attr("href", individualTrailerWatchURL + movie.videos.results[0].key)
      individualInfo = {
        movieOMDBId: getImdbId,
        movieTMDBId: id,
        showMovieTitle: "",
        showMovieImage: "",
        showMovieGenre: "", // Store the genre information
        showImdbRating: "",
        showBoxOffice: "",
        showYear: "",
        plot: "",
        runtime: "",
        showTrailerEmbed: individualTrailerEmbedURL + movie.videos.results[0].key,
        showTrailerWatch: individualTrailerWatchURL + movie.videos.results[0].key,
      }
    },
  });
  setTimeout(function () {
    const getOMDBUrl =
      "http://www.omdbapi.com/?i=" + getImdbId + "&apikey=d7afefce";
    $.ajax({
      type: "GET",
      datatype: "json",
      url: getOMDBUrl,
      success: function (data) {
        const movieOMDB = data;
        console.log(movieOMDB);
        $("#actors").text(movieOMDB.Actors);
        $("#director").text(movieOMDB.Director);
        $("#overview").text(movieOMDB.Plot);
        $("#rating").text(movieOMDB.imdbRating);
        $("#box-office").text(movieOMDB.BoxOffice);

        individualInfo.showMovieTitle = movieOMDB.Title;
        individualInfo.showMovieImage = movieOMDB.Poster;
        individualInfo.showMovieGenre = movieOMDB.Genre;
        individualInfo.showImdbRating = +movieOMDB.imdbRating;
        individualInfo.showBoxOffice = movieOMDB.BoxOffice;
        individualInfo.showYear = movieOMDB.Year;
        individualInfo.plot = movieOMDB.Plot;
        individualInfo.runtime = movieOMDB.Runtime;
        console.log(individualInfo);
      },
    });
  }, 100);
};
