$(document).ready(function(){
    if (document.cookie === "") {
        if (window.location.pathname == "/history.html")
         {
            // window.location.href = "/signin.html";
            $("#instruct").text("Please Sign In to view saved words in your wordbook");
         }
        else{
            $("#status").text("Log In");
            $("#status").attr('href', "/signin.html");
        }
        
    }
    else{
        $("#status").text("Log Out");
        $("#status").attr('href', "/logout.html");
        
    }
})
