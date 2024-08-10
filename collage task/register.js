document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const confirmPassword = document.getElementById("confirmpassword").value;
    const number = document.getElementById("number").value.trim();
    
    if (username && password && firstname && lastname && confirmPassword && number) {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else if (number.length !== 10 || isNaN(number)) {
            alert("Please enter a valid 10-digit number");
        } else {
           
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            localStorage.setItem("firstname", firstname);
            localStorage.setItem("lastname", lastname);
            localStorage.setItem("confirmpassword", confirmPassword);
            localStorage.setItem("number", number);
            
            window.location.href = "login.html";
            ///this  is also better way to stored data in multiple user
            // let users=JSON.parse(localStorage.getItem("users"))||[];
               
            // const newUser = {
            //     username: username,
            //     password: password,
            //     firstname: firstname,
            //     lastname: lastname,
            //     number: number
            // };

            // users.push(newUser);
            // localStorage.setItem("users", JSON.stringify(users));

        }
    } else {
        alert("Please fill all the fields");
    }
});
