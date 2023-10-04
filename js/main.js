

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