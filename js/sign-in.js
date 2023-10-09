const username = "James-1988"
const password = "Mac"
$(document).ready(function () {
 addForm();
ChangeForm();
getSignInfo();
signUpInfo();
checkForUsername();
});
checkForUsername = () =>{
  if(localStorage.getItem("Username") !== null){
    localStorage.removeItem("Username");
  }
}
// Switches between sign in and sign up forms with animation
ChangeForm = () =>{
    $("#form-container").on("click", ".changeForm", function(){
      //  switches to sign up form
        if($(this).attr("value") === "sign-in"){
        $("#form-container").empty();
        $("#form-container").append($("#sign-up-temp").html()); 
         $(".form-error").hide();   
        signUpInfo();
          var div = $(".sign-in-box");
          div.css("opacity", "0")
          div.animate({opacity: 1}, "slow")
           div.css("padding-bottom", "20px");
   
        }
        else{
          // Switches to sign in form
           $("#form-container").empty();
           $("#form-container").append($("#sign-in-temp").html()); 
           $(".form-error").hide();  
           getSignInfo(); 
         var div = $(".sign-in-box");
        
        div.css("opacity", "0");
        div.animate({ opacity: 1 }, "slow");
        }
    })
}
// add form when document is ready
addForm = () =>{
 $("#form-container").append($("#sign-in-temp").html());
 $(".form-error").hide();
}
// Stores username in browser's local storage after signing in username and password need to match stored.
getSignInfo= () =>{
$("#sign-in-form").on("click","#sign-in-button",
    function() {
        
        if($("#sign-in-user").val() === username && $("#password").val() === password ){
            $("#sign-in-form").submit(function (prevent) {
              prevent.preventDefault();
              let getInfo = JSON.stringify(username);
              localStorage.setItem("Username", getInfo);
              $(".form-error").hide();
              window.location.href = "../pages/Home-page.html"
            });
            
    }else{
        $("#sign-in-form").submit(function (prevent) {
          prevent.preventDefault();
          $(".form-error").show();
        }); 
    }
   
    
}
)
}
// sign up form submitting
signUpInfo = () =>{

$("#sign-up-form").submit(function(prevent){
  prevent.preventDefault();
   if ($("#password-first").val() === $("#check-password").val()) {
       
       $("#form-container").empty();
       $("#form-container").append($("#sign-in-temp").html());
       $(".form-error").hide();
       ChangeForm();
       getSignInfo();
   } else {
       $("#sign-up-form").find(".form-error").show();
     
   }
   
})
     
  
}