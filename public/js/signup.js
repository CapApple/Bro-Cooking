$(document).ready(function() {
    // Getting references to our form and input

   $("#signUpsubmit").on("click", function(event) {
      event.preventDefault();
      var userData = {
     email: $('#email-input1').val().trim(),
     password: $('#password-input1').val().trim()
      };
       if (!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password);
      $('#email-input1').val("");
      $('#password-input1').val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password) {
      $.post("/api/signup", {
        email: email,
        password: password
      }).then(function(data) {
        window.location.reload(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      }).catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  
  