const searchAPI = "https://striveschool-api.herokuapp.com/api/deezer/search?q=fellini";
const albumAPI = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const artistAPI = "https://striveschool-api.herokuapp.com/api/deezer/artist/139795852";
let albumID = 820121831;
let trackID = 3552598331;

function getTrackInfo(albumID, trackID) {
  fetch(albumAPI + albumID)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.tracks;
    })
    .then((tracks) => {
      tracks.data.forEach((track) => {
        if (track.id === trackID) {
          setTrack(track.preview);
          setTrackName(track.artist.name, track.title);
          setTrackImg(track.album.cover_small);
        }
      });
    })

    .catch((err) => {
      console.log("Errore: " + err);
    });
}

getTrackInfo(albumID, trackID);

function setTrack(currentTrackURL) {
  const currentTrack = new Audio(currentTrackURL);
  const allPlayBtn = document.querySelectorAll(".play");

  setTrackTime(currentTrack);

  //Funzioni START e PAUSE
  allPlayBtn.forEach((playBtn) => {
    playBtn.addEventListener("click", () => {
      if (currentTrack.paused) {
        currentTrack.play();
        playBtn.classList.remove("bi-play-fill");
        playBtn.classList.add("bi-pause-fill");
      } else {
        currentTrack.pause();
        playBtn.classList.remove("bi-pause-fill");
        playBtn.classList.add("bi-play-fill");
      }
    });
  });
}

function setTrackName(artistName, trackName) {
  const trackSpans = document.querySelectorAll(".songname");
  const artistSpan = document.querySelector(".artist");

  trackSpans.forEach((span) => {
    span.innerText = trackName;
  });
  artistSpan.innerText = artistName;
}

//Funzione per settare il tempo minimo e massimo formattato, per aggiornare la barra e per renderla interattiva
function setTrackTime(currentTrack) {
  const trackTime = document.querySelector(".tempo");
  const trackMaxTime = document.querySelector(".tempo-max");
  const progressBar = document.querySelector(".progress-bar-custom");
  const progressBarOngoing = document.querySelector(".progress-fill");
  let isDragging = false;
  let isDraggingProcess = false;

  //Aggiunge il listener che sul click porta la canzone a dove hai clickato e ne gestisce il trascinamento
  const updateTime = function (e) {
    const width = progressBar.clientWidth;

    const rettangolo = progressBar.getBoundingClientRect();
    let x = (e.clientX || (e.touches ? e.touches[0].clientX : 0)) - rettangolo.left;

    const duration = currentTrack.duration;

    let percentage = x / width;
    if (percentage < 0) percentage = 0;
    if (percentage > 1) percentage = 1;

    currentTrack.currentTime = percentage * duration;
  };
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

  currentTrack.addEventListener("timeupdate", () => {
    const progress = (currentTrack.currentTime / currentTrack.duration) * 100;
    progressBarOngoing.style.width = `${progress}%`;
    trackTime.innerText = formatTime(currentTrack.currentTime);
  });

  currentTrack.addEventListener("loadedmetadata", () => {
    trackMaxTime.innerText = formatTime(currentTrack.duration);
  });

  //Aggiunge il listener per sistemare il volume della traccia
  const volumeBar = document.getElementById("volume-bar");
  const volumeBarFill = document.getElementById("volume-bar-fill");

  const updateVolume = function (e) {
    const rettangolo = volumeBar.getBoundingClientRect();
    const widthRettangolo = rettangolo.width;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    let x = clientX - rettangolo.left;
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

  //Aggiungo l'event listener che mi passa alla prossima canzone una volta finita l'attuale
  currentTrack.addEventListener("ended", () => {
    // nextTrack();
  });
}

//L'audio viene formattato in millesimi di millesimi di secondo quindi lo converto
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

function setTrackImg(trackImg) {
  const playersImgs = document.querySelectorAll(".player-img");

  playersImgs.forEach((img) => {
    img.src = trackImg;
    console.log(img.src);
  });
}
