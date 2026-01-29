//aggiungere bottone per freccette
const MainUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const cards = document.querySelectorAll(".card-album");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const query = card.dataset.query;
    const Burl = MainUrl + encodeURIComponent(query);

    GetFetch(Burl);
  });
});
const Pcard = document.querySelectorAll(".box-playlist");
Pcard.forEach((card) => {
  card.addEventListener("click", () => {
    const query = card.dataset.query;
    const Burl = MainUrl + encodeURIComponent(query);

    GetFetch(Burl);
  });
});
// PER BOTTONE PLAY
const btnplay = document.getElementById("PLAY");
btnplay.addEventListener("click", () => {
  const query = btnplay.dataset.query;
  const Burl = MainUrl + encodeURIComponent(query);

  GetFetch(Burl);
});
// FINE BOTTONE PLAY

//funzione per fetch
const GetFetch = function (url) {
  //fetch
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Errore nel ricevere i dati");
      }
      return res.json();
    })
    .then((data) => {
      const dati = data.data;
      console.log(dati); //array da tot
      //altro codice da prendere

      window.location.href = `../../micro-componenti/album.html?AlbumID=${dati[0].album.id}`;
    })
    .catch((err) => {
      console.log("Errore catch", err);
    });
  //fine fetch
};
