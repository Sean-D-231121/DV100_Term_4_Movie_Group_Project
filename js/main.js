const youTubeURL = "https://www.youtube.com/embed/"
const test = "dfeUzm6KF4g";
let userName
/*$.ajax({
  type: "GET",
  url: "https://api.themoviedb.org/3/movie/550?api_key=b73d45f4cde3956c846eaca8f95d17d8&append_to_response=videos",
  
  success: function (data) {
    movie = data;
    console.log(movie);
  },
}).done(function () {
  console.log(youTubeURL + movie.videos.results[0].key);
  $(".video-example").attr("src", youTubeURL + movie.videos.results[0].key);
});*/
$(document).ready(function(){
    ChangeH1();
    
    $(window).on("load", function () {
      userName = JSON.parse(localStorage.getItem("Username"));
      console.log(userName);
      showUserName();
    });
})

showUserName = () => {
  $(".username").text(userName)
}
ChangeH1 = () =>{
$(".Heading").hover( function () {
  $(this).text("Jquery works");
}, function (){
    $(this).text("Hello, world");
});
}