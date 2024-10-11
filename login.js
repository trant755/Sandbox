const loginForm = document.querySelector("#login-form");
const loader = document.querySelector(".loader");

const token = localStorage.getItem("token");

if (token) {
  window.location.href = "/tablePage.html";
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loader.classList.add("active");
  const formData = new FormData(loginForm);

  const jsonData = JSON.stringify(Object.fromEntries(formData));

  const response = await fetch(
    "https://dopomoha.carpathia.gov.ua/api/border/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    window.location.href = "/tablePage.html";
  }

  if (response.status === 401) {
    const data = await response.json();
    loader.classList.remove("active");
    alert("Неправильний логін або пароль");
  }

  if (response.status === 500) {
    const data = await response.json();
    loader.classList.remove("active");
    alert("Щось пішло не так. Оновіть сторінку і спробуйте ще раз.");
  }
});
