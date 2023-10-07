// write j query to send form data to api/signin
$(document).ready(function(){
    $("#signup-form").submit(function(event){
        event.preventDefault();

        const username= $("#username").val();
        // console.log("username",username)
        const password=$("#password").val();



        $.ajax({
            url:"/api/register",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({username:username,password:password}),
            success:function(data){
                $("#username").val("");
                $("#password").val("");
                $("#repeat-password").val("");
                if(data.success===true){
                    window.location.href="/index.html";
                }
                else{
                    window.location.href="/useralreadyesists.html";
                }
            
            },
            error:function(error){
                console.error("something went wrong",error);
            }
        });
        
    })



})