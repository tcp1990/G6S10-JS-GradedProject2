
localStorage.setItem("loginUserName", "gluser");
localStorage.setItem("loginPassword", "Test@123");


function OnLoginClick() {

    var userNameValue = document.forms.LoginForm.userNameField.value;
    var passwordValue = document.forms.LoginForm.passwordField.value;

    if (userNameValue == "") {
        window.alert("Please enter your username properly.");
        userNameValue.focus();
        return false;
    }

    var storedUserName = localStorage.getItem("loginUserName");

    if (userNameValue !== storedUserName) {
        window.alert("Invalid User");
        userNameValue.focus();
        return false;
    }

    if (passwordValue == "") {
        alert("Please enter your password");
        passwordValue.focus();
        return false;
    }

    var storedPassword = localStorage.getItem("loginPassword");

    if (userNameValue !== storedUserName) {
        alert("Incorrect Password");
        passwordValue.focus();
        return false;

    }

    return true;
}
