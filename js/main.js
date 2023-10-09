

$(document).ready(function(){
    ChangeH1();
})
ChangeH1 = () =>{
$(".Heading").hover( function () {
  $(this).text("Jquery works");
}, function (){
    $(this).text("Hello, world");
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
