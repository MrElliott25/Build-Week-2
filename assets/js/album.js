const MainUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen"; //manca ?q= ....

//prendo dati

const url = location.search;
const allTheParameters = new URLSearchParams(url);
const AlbumID = allTheParameters.get("AlbumID");

const GetAlbum = function () {
  fetch(MainUrl + AlbumID)
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
      console.log(dati[0].album);
      const Aparts = dati[0].album;
      const Artistparts = dati[0].artist;
      const rowA = document.getElementById("row-album");
      rowA.innerHTML += `
         <div class="col"><img src="${Aparts.cover}" alt="${Aparts.title}" /></div>
          <div class="col p-1">
            <div class="text-start">
              <p>ALBUM</p>
              <h1 class="pb-4">${Aparts.title}</h1>
              <div class="d-flex align-items-center">
                <img class="rounded-5" src="${Artistparts.picture}" alt="${Artistparts.name}" />
                <p>${Artistparts.name} &middot; anno &middot; ${dati.length} , <span class="text-secondary">${dati.duration}</span></p>
              </div>
            </div>
          </div>
      `;

      //canzoni dell'album
      const row = document.getElementById("row-canzoni");
      dati.forEach((element, index) => {
        row.innerHTML += `
        <div class="row mb-2">
        <div class="col">${index + 1}</div>
        <div class="col">
          <h5 class="m-0 p-0"> ${element.title}</h5>
          <p>${element.artist.name}</p>
        </div>
        <div class="col">${element.rank}</div>
        <div class="col">${element.duration}</div>
        </div>`;

        /* `
                <div class="col col-12 col-md-8 col-lg-6">
            <div class="card d-flex">
                <img src="${element.cover}" class="card-img-top" alt="${element.title}">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.artist.name}</p>
                    <p class="card-text">${element.duration}</p>
                    <p class="card-text">${element.rank}€</p>
                </div>
            </div>
        </div>
        `; */
      });
    })
    .catch((err) => {
      console.log("Errore catch", err);
    });
};
GetAlbum();
// fare funzione per colore dell'album
