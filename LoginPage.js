localStorage.setItem("loginUserName", "gluser");
localStorage.setItem("loginPassword", "Test@123");

function OnLoginClick() {

    var userNameValue = document.forms.LoginForm.userNameField.value;
    var passwordValue = document.forms.LoginForm.passwordField.value;

    var storedUserName = localStorage.getItem("loginUserName");
    var storedPassword = localStorage.getItem("loginPassword");

    if (userNameValue !== storedUserName ||
        passwordValue !== storedPassword) {
        window.alert("Invalid UserName/Password");
        return false;
    }

    document.location.href = "ResumePage.html";
    sessionStorage.setItem("loginStatus", "loggedIn");
    return false;
}

function checkLoggedInStatus() {
    var storedLoginStatus = sessionStorage.getItem("loginStatus");
    if ("loggedIn" === storedLoginStatus) {
        document.location.href = "ResumePage.html";
    }
}
