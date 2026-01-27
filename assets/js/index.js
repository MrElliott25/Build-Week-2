//collegare a home page
const MainUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen"; //manca ?q= ....
const GetData = function (url) {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Errore nel ricevere i dati");
      }
      return res.json();
    })
    .then((data) => {
      console.log("dati ", data);

      const dati = data.data;
      console.log(dati[0]);
      //altro codice da prendere
      const map = document.querySelector(".mapp");
      map.innerHTML += `
      <a href="../../micro-componenti/album.html?AlbumID=${dati[0].album.id}" class="btn btn-primary w-100">VAI AI DETTAGLI</a>
      `;
    })
    .catch((err) => {
      console.log("Errore catch", err);
    });
};
GetData(MainUrl);
