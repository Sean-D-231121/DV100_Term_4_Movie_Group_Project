const username = "James-1988"
const password = "Mac001"
$(document).ready(function () {
 addForm();
ChangeForm();
getSignInfo();
signUpInfo();
});
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

        
        
            $("#sign-in-form").submit(function (event) {
              event.preventDefault();
              if(this.checkValidity() === false){
                event.stopPropagation();
                 keyUpFunctionsSignIn();
      
              }
               else if (
                 (this.checkValidity() === true && $("#sign-in-user").val()) ===
                   username &&
                 $("#password").val() === password
               ) {
                 let getInfo = JSON.stringify(username);
                 localStorage.setItem("Username", getInfo);
                 $(".form-error").hide();
                 window.location.href = "../pages/Home-page.html";

               }
            else{
              event.stopPropagation();
              if (
                $("#sign-in-user").val() !== username &&
                $("#password").val() !== password
              ) {
                $(".form-error").text("The entered Username and Password is incorrect!");
                $("#sign-in-form").find(".form-error").show();
                $("#sign-in-user").addClass("password-problem");
                $("#password").addClass("password-problem");
                keyUpFunctionsSignIn();
              } else if($("#sign-in-user").val() !== username){
                $(".form-error").text(
                  "The entered Username is incorrect!"
                );
                $("#sign-in-form").find(".form-error").show();
                $("#sign-in-user").addClass("password-problem");
                keyUpFunctionsSignIn();
              } else{
                $(".form-error").text("The entered Password is incorrect!");
                $("#sign-in-form").find(".form-error").show();
                $("#password").addClass("password-problem");
                 keyUpFunctionsSignIn();
              }
              
             
            }
            $(this).addClass("was-validated");
            });
            
            
    
   
    

}
// sign up form submitting
signUpInfo = () =>{

$("#sign-up-form").submit(function(event){
  event.preventDefault();
  if (this.checkValidity() === false) {
    event.stopPropagation();
  } else if (
    this.checkValidity() === true &&
    $("#password-first").val() === $("#check-password").val()
  ) {
    $("#form-container").empty();
    $("#form-container").append($("#sign-in-temp").html());
    $(".form-error").hide();
    ChangeForm();
    getSignInfo();
  } else {
    event.stopPropagation();
    
    $("#sign-up-form").find(".form-error").show();
    
  }
   $(this).addClass("was-validated");
   
})
     
  
}
keyUpFunctionsSignIn = () =>{
onKeyUpError("#sign-in-user", "#password", "#sign-in-form", username, password);
onKeyUpError("#password", "#sign-in-user", "#sign-in-form", password, username);
}
// Used to determine the whether an input equals a value while being input
onKeyUpError = (inputId1,inputId2,formId,inputValue, inputValue2) =>{

  $(inputId1).keyup(function(){
    // Checks whether both password and username are wrong
    if ($(inputId1).val() !== inputValue && $(inputId2).val() !== inputValue2) {
         $(".form-error").text(
           "The entered Username and Password is incorrect!"
         );
         $(formId).find(".form-error").show();
          $(inputId1).addClass("password-problem");
    } 
    // checks if first input value is equal to value and if input value 2 is incorrect
    else if ($(inputId1).val() === inputValue && $(inputId2).val() !== inputValue2) {
      if ($(inputId1).attr("type") === "password") {

        $(".form-error").text(`The entered username is incorrect!`);
        $(formId).find(".form-error").show();
        $(inputId1).removeClass("password-problem");
      } else {
        $(".form-error").text(`The entered password is incorrect!`);
        $(formId).find(".form-error").show();
        $(inputId1).removeClass("password-problem");
      }
    } 
    //  Checks if only inputId1 has been found to be correct
    else if ($(inputId1).val() === inputValue) {
      $(formId).find(".form-error").hide();
      $(inputId1).removeClass("password-problem");
      
    } 
    // Checks if inputId1 is the only input wrong on entry
    else if ($(inputId1).val() !== inputValue) {
      if ($(inputId1).attr("type") === "password") {
        $(".form-error").text(`The entered password is incorrect!`);
      } else {
        $(".form-error").text(`The entered username is incorrect!`);
      }
      $(formId).find(".form-error").show();
      $(inputId1).addClass("password-problem");
    } 
  })
}