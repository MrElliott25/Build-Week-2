const searchAPI = "https://striveschool-api.herokuapp.com/api/deezer/search?q=fellini";
const albumAPI = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const artistAPI = "https://striveschool-api.herokuapp.com/api/deezer/artist/139795852";
let albumID = 820121831;
let trackID = 3552598331;
const playlist = [];
let currentIndex = 3;
const currentTrack = new Audio();
let firstCall = true;

//Fetch riutilizzata per settare il brano
function getTracksInfo(albumID, trackID) {
  fetch(albumAPI + albumID)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.tracks;
    })
    .then((tracks) => {
      tracks.data.forEach((track) => {
        if (localStorage.getItem("playlist") === null) {
          playlist.push(track);
          localStorage.setItem("playlist", JSON.stringify(playlist));
        }
        if (track.id === trackID) {
          setTrack(track.preview);
          setTrackName(track.artist.name, track.title);
          setTrackImg(track.album.cover_small);
        }
        if (firstCall === false) currentTrack.play();
      });
    })

    .catch((err) => {
      console.log("Errore: " + err);
    });
}

//Se non c'è nulla, la inizializzo con le variabili dichiarate sopra
if (localStorage.getItem("playlist") === null) {
  getTracksInfo(albumID, trackID);
} else {
  const localPlaylist = JSON.parse(localStorage.getItem("playlist"));
  localPlaylist.forEach((track) => {
    playlist.push(track);
  });
  console.log(playlist);
  getTracksInfo(playlist[0].album.id, playlist[0].id);
  currentIndex = 0;
}

//Funzioni chiamata dall'event listener (sotto nella region) per cambiare canzoni
function nextTrack() {
  currentIndex++;
  console.log(playlist[currentIndex].title);
  if (currentIndex === playlist.length) currentIndex = 0;
  getTracksInfo(playlist[currentIndex].album.id, playlist[currentIndex].id);
  progressBarOngoing.style.width = `0%`;
  firstCall = false;
}

function prevTrack() {
  currentIndex--;
  if (currentIndex < 0) currentIndex = playlist.length - 1;
  getTracksInfo(playlist[currentIndex].album.id, playlist[currentIndex].id);
  progressBarOngoing.style.width = `0%`;
  firstCall = false;
}

//Funzione che setta effettivamente la track
function setTrack(currentTrackURL) {
  currentTrack.src = currentTrackURL;
  console.log(currentTrack.src);

  currentTrack.pause();
  currentTrack.load();
}

function setTrackName(artistName, trackName) {
  const trackSpans = document.querySelectorAll(".songname");
  const artistSpan = document.querySelector(".artist");

  trackSpans.forEach((span) => {
    span.innerText = trackName;
  });
  artistSpan.innerText = artistName;
}

function setTrackImg(trackImg) {
  const playersImgs = document.querySelectorAll(".player-img");

  playersImgs.forEach((img) => {
    img.src = trackImg;
  });
}

//#region  ALL EVENT LISTENERS

//TUTTI I DATI usati nei listener
const progressBar = document.querySelector(".progress-bar-custom");
const progressBarOngoing = document.querySelector(".progress-fill");
const trackTime = document.querySelector(".tempo");
const trackMaxTime = document.querySelector(".tempo-max");
let isDragging = false;
let isDraggingProcess = false;
const allPlayBtn = document.querySelectorAll(".play");
const allPrevBtn = document.querySelectorAll(".bi-skip-start-fill");
const allNextBtn = document.querySelectorAll(".bi-skip-end-fill");
const volumeBar = document.getElementById("volume-bar");
const volumeBarFill = document.getElementById("volume-bar-fill");

//Listener START e PAUSE
allPlayBtn.forEach((playBtn) => {
  playBtn.addEventListener("click", () => {
    if (currentTrack.paused) {
      currentTrack.play();
      allPlayBtn.forEach((playIcon) => {
        playIcon.classList.remove("bi-play-fill");
        playIcon.classList.add("bi-pause-fill");
      });
    } else {
      currentTrack.pause();
      allPlayBtn.forEach((pauseIcon) => {
        pauseIcon.classList.remove("bi-pause-fill");
        pauseIcon.classList.add("bi-play-fill");
      });
    }
  });
});

//Listener dei prev e next song
allPrevBtn.forEach((prevBtn) => {
  prevBtn.addEventListener("click", () => {
    prevTrack();
  });
});

allNextBtn.forEach((nextBtn) => {
  nextBtn.addEventListener("click", () => {
    nextTrack();
  });
});

//Funzione e Listener per l'update del tempo corrente sulla pagina
const updateTime = function (e) {
  const width = progressBar.clientWidth;

  const rettangolo = progressBar.getBoundingClientRect();
  let x = e.clientX - rettangolo.left;

  const duration = currentTrack.duration;

  let percentage = x / width;
  if (percentage < 0) percentage = 0;
  if (percentage > 1) percentage = 1;

  currentTrack.currentTime = percentage * duration;
};

//Listener per permettere all'utente di cambiare il tempo sulla barra della canzone clickando
progressBar.addEventListener("mousedown", (e) => {
  isDraggingProcess = true;
  updateTime(e);
});

window.addEventListener("mousemove", (e) => {
  if (isDraggingProcess) {
    updateTime(e);
  }
});

window.addEventListener("mouseup", () => {
  isDraggingProcess = false;
});

//L'audio viene formattato in millesimi di millesimi di secondo quindi lo converto
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

//Aggiunge il listener per sistemare il volume della traccia
const updateVolume = function (e) {
  const rettangolo = volumeBar.getBoundingClientRect();
  const widthRettangolo = rettangolo.width;

  let x = e.clientX - rettangolo.left;
  let newVolume = x / widthRettangolo;

  if (newVolume < 0) newVolume = 0;
  if (newVolume > 1) newVolume = 1;

  currentTrack.volume = newVolume;
  volumeBarFill.style.width = newVolume * 100 + "%";
};

volumeBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  updateVolume(e);
});

window.addEventListener("mousemove", (e) => {
  if (isDragging) {
    updateVolume(e);
  }
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

//Event listener collegati alla traccia
currentTrack.addEventListener("ended", () => {
  nextTrack(currentIndex);
});

//Questo listener mi serve per quando cambio l'audio tramite i bottoni next e prev
currentTrack.addEventListener("play", () => {
  allPlayBtn.forEach((playIcon) => {
    playIcon.classList.add("bi-pause-fill");
    playIcon.classList.remove("bi-play-fill");
  });
});

currentTrack.addEventListener("timeupdate", () => {
  const progress = (currentTrack.currentTime / currentTrack.duration) * 100;
  progressBarOngoing.style.width = `${progress}%`;
  trackTime.innerText = formatTime(currentTrack.currentTime);
});

currentTrack.addEventListener("loadedmetadata", () => {
  trackMaxTime.innerText = formatTime(currentTrack.duration);
});

//#endregion ALL EVENT LISTENERS
