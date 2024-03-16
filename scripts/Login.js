document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("login-btn").addEventListener("click", () => {sign_in()});

  const storeUserInStorage = (user) => {
    const currentUser = user;
    localStorage.setItem("currentUser", currentUser); // Store in local storage to know which user is logged in
    console.log("user logged in successfully")
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
            window.location.href = "../Main_Page/mainPage.html";
          } else {
            alert("Invalid username or password");
          }
        });
    } catch (error) {
      alert("Can't access json");
    }
  };
});
