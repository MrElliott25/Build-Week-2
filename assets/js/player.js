const searchAPI = "https://striveschool-api.herokuapp.com/api/deezer/search?q=kid yugi";
const albumAPI = "https://striveschool-api.herokuapp.com/api/deezer/album/820121831";
const artistAPI = "https://striveschool-api.herokuapp.com/api/deezer/artist/139795852";

let currentTrackURL =
  "https://cdnt-preview.dzcdn.net/api/1/1/5/b/2/0/5b2f00a13f04d41de643adf3b84a671d.mp3?hdnea=exp=1769437475~acl=/api/1/1/5/b/2/0/5b2f00a13f04d41de643adf3b84a671d.mp3*~data=user_id=0,application_id=42~hmac=dfa7556a9fba7e62932de1b7cef74be50bfd57d0655dc03e8d1ef0c11534a509";

function setTrack(currentTrackURL) {
  const currentTrack = new Audio(currentTrackURL);
  const allPlayBtn = document.querySelectorAll(".play");

  setTrackName(currentTrack);
  setTrackTime(currentTrack);

  //Funzioni START e PAUSE
  allPlayBtn.forEach((playBtn) => {
    playBtn.addEventListener("click", () => {
      if (currentTrack.paused) {
        currentTrack.play();
        playBtn.classList.add("bi-pause-fill");
        playBtn.classList.remove("bi-play-fill");
      } else {
        currentTrack.pause();
        playBtn.classList.remove("bi-pause-fill");
        playBtn.classList.add("bi-play-fill");
      }
    });
  });
}

function setTrackName(currentTrack) {
  const trackName = document.querySelectorAll(".songname");
  const artistName = document.querySelector(".artist");
}

//Funzione per settare il tempo minimo e massimo formattato, e per aggiornare la barra
function setTrackTime(currentTrack) {
  const trackTime = document.querySelector(".tempo");
  const trackMaxTime = document.querySelector(".tempo-max");
  const progressBar = document.querySelector(".progress-fill");

  currentTrack.addEventListener("timeupdate", () => {
    const progress = (currentTrack.currentTime / currentTrack.duration) * 100;
    progressBar.style.width = `${progress}%`;
    trackTime.innerText = formatTime(currentTrack.currentTime);
  });

  currentTrack.addEventListener("loadedmetadata", () => {
    trackMaxTime.innerText = formatTime(currentTrack.duration);
  });
}

//L'audio viene formattato in millesimi di millesimi di secondo quindi lo converto
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

setTrack(currentTrackURL);

//FETCH DA RIMUOVERE ALLA FINE
fetch(albumAPI)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Errore nel recupero dati");
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log("Errore: ", err);
  });
fetch(searchAPI)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Errore nel recupero dati");
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log("Errore: ", err);
  });
fetch(artistAPI)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Errore nel recupero dati");
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log("Errore: ", err);
  });
