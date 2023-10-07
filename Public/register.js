// write j query to send form data to api/signin
$(document).ready(function(){
    $("#signup-form").submit(function(event){
        event.preventDefault();

        const username= $("#username").val();
        const password=$("#password").val();
        const repeatPassword=$("#repeat-password").val();
        if (password!==repeatPassword){
            alert("Passwords don't match")
            return;
        }



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
                    document.cookie = "token="+data.token;
                    window.location.href="/index.html";
                    
                }
                else{
                    alert("Username already exists")
                }
            
            },
            error:function(error){
                console.error("something went wrong",error);
            }
        });
        
    })



})