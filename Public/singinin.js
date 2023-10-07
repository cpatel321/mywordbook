// write j query to send form data to api/signin
$(document).ready(function(){
    $("#signin-form").submit(function(event){
        event.preventDefault();

        const username= $("#username").val();
        console.log("username",username)
        
        const password=$("#password").val();


        $.ajax({
            url:"/api/login",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({username:username,password:password}),
            success:function(data){

                $("#username").val("");
                $("#password").val("");

                if(data.success===true){
                    window.location.href="/index.html";
                    document.cookie = "userid="+data.userid;
                }
                else{
                    window.location.href="/failed.html";
                }
            
            },
            error:function(error){
                console.error("something went wrong",error);
            }
        });
        
    })



})