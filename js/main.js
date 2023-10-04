

$(document).ready(function(){
    ChangeH1();
})
ChangeH1 = () =>{
$("h1").hover( function () {
  $(this).text("Jquery works");
}, function (){
    $(this).text("Hello, world");
});
}