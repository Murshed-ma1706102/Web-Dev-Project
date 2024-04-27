document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("login-btn").addEventListener("click", () => {sign_in()});

  
  const sign_in = async () => {
    try {
      await fetch("/api/users")
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          const username = document.getElementById("username").value;
          const password = document.getElementById("password").value;

          const user = data.find(
            (u) => username == u.username && password == u.password
          );

          if (user) {
            const res2 = await fetch("/api/currentUser", {
              method: "PUT",
              body: JSON.stringify({userId: user.userId ,login: true, type: user.type})
            });
            if (user.type == "seller")
              window.location.href = "seller.html";
            else if(user.type =="customer")
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
