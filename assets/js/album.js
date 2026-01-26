//dettagli e far comparire tramite id cosa selezionato
const mainUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen";
/*
const url = location.search;
const allTheParameters = new URLSearchParams(url);
const ProductID = allTheParameters.get("productId");
console.log("productid", ProductID);
*/
const AlbumID = jsjaja; //mettere id di prova
const GetAlbum = function () {
  fetch(mainUrl + "/" + AlbumID)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero del dettaglio concerto");
      }
    })
    .then((data) => {
      console.log("DETTAGLI RECUPERATI", data);

      const row = document.getElementById("events-row");
      data.array.forEach((element, index) => {
        row.innerHTML += `       
        <div class="col">
          <h5 class="m-0 p-0">${index} ${element.title}</h5>
          <p>${element.artist}</p>
        </div>
        <div class="col">${element.rank}</div>
        <div class="col">${element.duration}</div>
      </div>`;
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

GetAlbum();
