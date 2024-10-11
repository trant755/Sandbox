//get token from local storage

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/";
}
const btnDownload = document.querySelector("#download-table");

btnDownload.addEventListener("click", async () => {
  try {
    const response = await fetch(
      "https://dopomoha.carpathia.gov.ua/api/border/table-data",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    const csvText = data.data;

    textFileDownload(csvText, "table");

    //log out

    localStorage.removeItem("token");
    window.location.href = "/";
  } catch (error) {
    alert("Щось пішло не так. Оновіть сторінку і спробуйте ще раз.");
  }
});

const textFileDownload = (csvText, tableName) => {
  const blob = new Blob([csvText], { type: "text/csv" });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = tableName;
  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
};
