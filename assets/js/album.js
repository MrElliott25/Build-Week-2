// PRENDO DATI DA URL
const url = location.search;
const allTheParameters = new URLSearchParams(url);
const AlbumID = allTheParameters.get("AlbumID");

const MainUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${AlbumID}`;

const GetAlbum = function () {
  fetch(MainUrl)
    .then((res) => {
      if (!res.ok) throw new Error("Errore nel ricevere i dati");
      return res.json();
    })
    .then((album) => {
      stampatitolo(album);
      stampacanzoni(album.tracks.data);
    })
    .catch((err) => console.log("Errore:", err));
};

GetAlbum();
//FUNZIONI
const stampatitolo = function (album) {
  const rowA = document.getElementById("row-album");

  rowA.innerHTML = `
    
      <img
        id="album-cover"
        src="${album.cover_medium}"
        crossorigin="anonymous"
        alt="${album.title}"
        class="image-fluid"
      />
    
    <div class="ms-4 col p-1 text-start">
      <p id="scritta-album">ALBUM</p>
      <h1 class="nome-album">${album.title}</h1>
      <p class="fw-bold"><a class="text-decoration-none" href="./ArtistaPage.html?ArtistID=${album.artist.id}">${album.artist.name}</a> · ${album.tracks.data.length} brani</p>
    </div>
  `;

  const img = document.getElementById("album-cover");

  img.onload = () => applyAlbumColor(img);
};

// STAMPA CANZONI
const stampacanzoni = function (tracks) {
  const row = document.getElementById("row-canzoni");
  row.innerHTML = "";

  tracks.forEach((track, index) => {
    const minutes = Math.floor(track.duration / 60);
    const seconds = track.duration % 60;

    row.innerHTML += `
              <div class="row align-items-center mb-2 py-2 px-0 pointer text-start">
            <div class="col-1 position-relative number-cell ps-0">
              <span class="pointer-number">${index + 1}</span>
              <i class="fa-solid fa-play play-icon retriever"></i>
              <p class="d-none trackvalue">${track.id}</p>
              <p class="d-none albumvalue">${track.album.id}</p>
            </div>

            <div class="col-5 text-truncate">
              <h5 class="m-0 text-white">
                ${track.title}
              </h5>
              <p class="m-0 text-secondary">${track.artist.name}</p>
            </div>

            <div class="col-3 text-end">${track.rank.toLocaleString()}</div>
            <div class="col-3 text-center"> ${minutes}:${seconds.toString().padStart(2, "0")}</div>
          </div>`;

    //     row.innerHTML += `
    //   <div class="row align-items-center py-2 text-white g-0 song-row px-2">
    //     <div class="col d-flex align-items-center">
    //       <div class="text-secondary me-3" style="width: 30px;">
    //         ${index + 1}
    //       </div>

    //       <div class="d-flex flex-column overflow-hidden align-items-start">
    //         <div class="fw-semibold text-white text-truncate">${track.title}</div>
    //         <div class="text-secondary small text-truncate">${track.artist.name}</div>
    //       </div>
    //     </div>

    //     <div class="col-2 text-secondary  pe-3">
    //
    //     </div>

    //     <div class="col-2 text-secondary small">
    //       ${minutes}:${seconds.toString().padStart(2, "0")}
    //     </div>
    //   </div>
    // `;
  });
};
/*
<div class="col d-flex gap-4">
                    <div class="text-start"> ${index + 1}</div>
                    <div class="me-3">${track.title}</div>
                    <div class="text-secondary small text-truncate">${track.artist.name}</div>
                  </div>
                  <div class="col-2">${track.rank}</div>
                  <div class="col-2">${minutes}:${seconds.toString().padStart(2, "0")}</div>
                </div>
*/

//FUNZIONE DEL COLORE
const draw = function (img) {
  const canvas = document.createElement("canvas");
  const c = canvas.getContext("2d");

  c.width = canvas.width = img.clientWidth;
  c.height = canvas.height = img.clientHeight;

  c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
  return c;
};

const getColors = function (c) {
  const colors = {};
  const pixels = c.getImageData(0, 0, c.width, c.height);

  for (let i = 0; i < pixels.data.length; i += 4) {
    const r = pixels.data[i];
    const g = pixels.data[i + 1];
    const b = pixels.data[i + 2];
    const a = pixels.data[i + 3];

    if (a < 128) continue;

    const col = rgbToHex(r, g, b);
    colors[col] = (colors[col] || 0) + 1;
  }

  return colors;
};

const findMostRecurrentColor = function (colorMap) {
  let max = 0;
  let dominant = null;

  for (const color in colorMap) {
    if (colorMap[color] > max) {
      max = colorMap[color];
      dominant = color;
    }
  }

  return dominant;
};

const rgbToHex = function (r, g, b) {
  return ((r << 16) | (g << 8) | b).toString(16);
};

const pad = function (hex) {
  return ("000000" + hex).slice(-6);
};

const applyAlbumColor = function (img) {
  const context = draw(img);
  const colors = getColors(context);
  const mostRecurrent = findMostRecurrentColor(colors);
  const hexColor = "#" + pad(mostRecurrent);
  const colore2 = "#131313";
  const mioGradiente = `linear-gradient(to bottom, ${hexColor} 0% , ${colore2} 35% )`;
  document.getElementById("hero").style.background = mioGradiente;
};
