document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("login-btn").addEventListener("click", () => {sign_in()});

  const storeUserInStorage = (user) => {
    const currentUser = user;
    localStorage.setItem("currentUser", currentUser); // Store in local storage to know which user is logged in
  };

  const sign_in = async () => {
    try {
      fetch("./scripts/users.json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const username = document.getElementById("username").value;
          const password = document.getElementById("password").value;

          const user = data.find(
            (u) => username == u.username && password == u.password
          );

          if (user) {
            storeUserInStorage(JSON.stringify(user));
            if (user.type == "seller")
              window.location.href = "seller.html";
            else 
              window.location.href = "mainPage.html";
          } else {
            document.querySelector(".invalid").classList.remove("hide");
          }
        });
    } catch (error) {
      alert("Can't access json");
    }
  };

  // if the user click on the logo it will return him to the main page
  document.querySelector("header div").addEventListener("click", (e) => {
    localStorage.setItem("currentUser", null);
    window.location.href = "mainPage.html";
  })
});
