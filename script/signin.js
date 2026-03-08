document.getElementById('signin-btn').addEventListener("click", function(){
    // console.log("clicked")

    // get the user input
    const userInput = document.getElementById('input-username');
    const userName = userInput.value;
    // console.log(userName);

    // get the password

    const passwordInput = document.getElementById('input-password');
    const password = passwordInput.value;
    // console.log(password);

    // match username and password

    if(userName == 'admin' && password == 'admin123'){
        alert("Sign-in Success");
        window.location.assign("/homepage.html")
    }
    else{
        alert("Sign-in failed");
        return;
    }
})