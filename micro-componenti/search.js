const baseUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const searchInput = document.getElementById("mainSearch");

const cardElements = document.querySelectorAll(".card-item");

const GetData = function (query) {
  const fullUrl = baseUrl + query;

  fetch(fullUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Errore nel ricevere i dati");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Dati ricevuti:", data);
      const dati = data.data;

      cardElements.forEach((card, index) => {
        const result = dati[index];

        const title = card.querySelector(".card-title");
        const img = card.querySelector(".card-img");
        const link = card.querySelector(".details-btn");

        if (result) {
          card.style.display = "block";
          title.innerText = result.title;
          img.src = result.album.cover_medium;
          img.alt = result.title;

          if (link) {
            link.href = `../../micro-componenti/album.html?AlbumID=${result.album.id}`;
          }
        } else {
          card.style.display = "none";
        }
      });
    })
    .catch((err) => {
      console.log("Errore catch", err);
    });
};

searchInput.addEventListener("input", (e) => {
  const query = e.target.value;
  if (query.length >= 3) {
    GetData(query);
  }
});
