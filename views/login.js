(function() { 
    var form = document.querySelector("#loginForm");
    if(sessionStorage.getItem("username")){
        view.innerHTML = "<h4>Welcome " + sessionStorage.getItem("username") +". You are logged in successfully.</h4>";
        view.innerHTML += "<button id='logoutButton'> Logout </button>";
        document.getElementById("logoutButton").onclick = function(){
            sessionStorage.removeItem("username");
            location.reload();
        };
        return;
    }
    form.addEventListener("submit", function(e){
        e.preventDefault();

        if(login(form.user.value, form.passwd.value)){
            var view = document.getElementsByClassName("view")[0];
            view.innerHTML = "<h4>Welcome " + sessionStorage.getItem("username") +" </h4>";
        } else {
            alert("Failed, now u get rolled >:(");
            location.href = "http://rebecca.blackfriday";
        }
    });
})()    