//prendo dati
const url = location.search;
const allTheParameters = new URLSearchParams(url);
const AlbumID = allTheParameters.get("AlbumID");

const MainUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${AlbumID}`;

const GetAlbum = function () {
  fetch(MainUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Errore nel ricevere i dati");
      }
      return res.json();
    })
    .then((album) => {
      console.log("ALBUM:", album);

      stampatitolo(album);
      stampacanzoni(album.tracks.data);
    })
    .catch((err) => {
      console.log("Errore catch", err);
    });
};

GetAlbum();

// fare funzione per colore dell'album
const stampatitolo = function (album) {
  const rowA = document.getElementById("row-album");

  rowA.innerHTML += `
         <div class="col"><img src="${album.cover_medium}" alt="${album.title}" /></div>
          <div class="col p-1">
            <div class="text-start">
              <p>ALBUM</p>
              <h1 class="pb-4">${album.title}</h1>
              <div class="d-flex align-items-center">
                <img class="rounded-5 ms-3" src="${album.artist.picture_small}" alt="${album.artist.name}" />
                <p>${album.artist.name} &middot; anno &middot; lunghezza , <span class="text-secondary">${album.tracks.data.length} Brani</span></p>
              </div>
            </div>
          </div>
      `;
};
const stampacanzoni = function (tracks) {
  const row = document.getElementById("row-canzoni");
  tracks.forEach((element, index) => {
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
  });
};
