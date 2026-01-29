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
    
    <div class="col p-1 text-start">
      <p>ALBUM</p>
      <h1>${album.title}</h1>
      <p><a class="text-decoration-none" href="./ArtistaPage.html?ArtistID=${album.artist.id}">${album.artist.name}</a> · ${album.tracks.data.length} brani</p>
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
      <div class="row align-items-center py-2 text-white">
        <div class="col-auto text-secondary pe-2 d-none d-md-block">
          ${index + 1}
        </div>
        <div class="col">
          <div class="fw-semibold">${track.title}</div>
          <div class="text-secondary small">${track.artist.name}</div>
        </div>
        <div class="col-2 text-secondary d-none d-md-block text-end">
          ${track.rank}
        </div>
        <div class="col-2 text-end text-secondary small">
          ${minutes}:${seconds.toString().padStart(2, "0")}
        </div>

      </div>
    `;
  });
};

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
