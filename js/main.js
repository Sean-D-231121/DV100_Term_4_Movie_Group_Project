
let userName

$.ajax({
  type: "GET",
  url: "http://www.omdbapi.com/?i=tt3896198&apikey=d7afefce",
  success: function (data) {
    movie = data;
  },
}).done(function () {
    moviePoster = movie.Poster;
    checkMovieData = JSON.stringify(movie);
    console.log(moviePoster);
});


$(document).ready(function(){
    ChangeH1();
    // Get username when a new page loads
    $(window).on("load", function () {
      userName = JSON.parse(localStorage.getItem("Username"));
      console.log(userName);
      showUserName();
    });
})
// Stores username on right side of navbar
showUserName = () => {
  $(".username").text(userName)
}
//ChangeH1 = () =>{
$(".Heading").hover( function () {
  $(this).text("Jquery works");
}, function (){
    $(this).text("POPULAR PICKS");
});
}

const particlesConfig = {
  particles: {
      number: {
          value: 50, // Number of particles
      },
      size: {
          value: 3, // Size of particles
      },
      color: {
          value: "#ffffff", // Color of particles
      },
      move: {
          speed: 2, // Speed of particles' movement
      },
  },
};

particlesJS("footer", particlesConfig);
