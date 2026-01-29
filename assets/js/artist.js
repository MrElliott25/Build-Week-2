// PRENDO DATI DA URL

const url = location.search;
const allTheParameters = new URLSearchParams(url);
const ArtistID = allTheParameters.get("ArtistID");

const MainUrl = ` https://striveschool-api.herokuapp.com/api/deezer/artist/${ArtistID}`;

const GetAlbum = function () {
  fetch(MainUrl)
    .then((res) => {
      if (!res.ok) throw new Error("Errore nel ricevere i dati");
      return res.json();
    })
    .then((data) => {
      console.log(data);
      stampatitolo(data);
      stampacanzoni(data.tracklist);
    })
    .catch((err) => console.log("Errore:", err));
};

GetAlbum();
//FUNZIONI
const stampatitolo = function (artista) {
  const sezione = document.getElementById("sezione-titolo");

  sezione.innerHTML = `
     <div class="position-relative"> 
      <img src="${artista.picture_xl}" 
       class=" card-img-top" 
       style="object-fit: cover;  z-index: -1;" 
       alt="Foto di ${artista.name}">
        <div class="position-absolute bottom-0 start-0 text-start text-white p-3 p-md-5">
          <p><i class="fa-regular fa-circle-check"></i> Artista Verificato</p>
          <h2 class="h3 h-md1 fs-1">${artista.name}</h2>
          <p>${artista.nb_fan} Ascoltatori Mensili</p>
        </div>
      </div>
  `;
};

// STAMPA CANZONI
const stampacanzoni = function (track) {
  const row = document.getElementById("row-song");
  console.log(track); //https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=50
  fetch(track)
    .then((res) => {
      if (!res.ok) throw new Error("Errore nel ricevere i dati");
      return res.json();
    })
    .then((data) => {
      const Container = document.getElementById("Song");
      const dati = data.data;
      console.clear();
      console.log(dati); //recupero array delle canzoni
      const array = [];
      dati.forEach((element) => {
        array.push({
          id: element.album.id,
          img: element.album.cover_small,
          title: element.title,
          rank: element.rank,
          duration: element.duration,
        });
      });
      console.log("array fiko", array);
      array.sort((a, b) => b.rank - a.rank);
      array.forEach((element) => {
        Container.innerHTML += `

              <div class="row align-items-center py-3">
                <div class="col-5 d-flex align-items-center">
                  <img src="${element.img}" style="width: 60px" class="me-3" />
                  <a href="album.html?AlbumID=${element.id}" class="text-decoration-none  text-white m-0">${element.title}</a>
                </div>
                <div class="col-3 text-center">${element.rank}</div>
                <div class="col-3 text-end">${formatTime(element.duration)}</div>



`;
      });
    })
    .catch((err) => console.log("Errore:", err));
};

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}
