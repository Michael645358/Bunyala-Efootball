function login() {

const username =
document.getElementById("username").value;

const password =
document.getElementById("password").value;

if (
    username === "MikeAdmin" &&
    password === "12345"
) {

    localStorage.setItem(
        "adminLoggedIn",
        "true"
    );

    window.location.href =
    "admin.html";

} else {

    document.getElementById(
        "message"
    ).innerHTML =
    "❌ Invalid login";

}

}