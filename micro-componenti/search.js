const baseUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const searchInput = document.getElementById("mainSearch");
// Selezioniamo tutte le card fisiche che hai nell'HTML
const cardElements = document.querySelectorAll(".card-item");

const GetData = function (query) {
  // Costruiamo la URL dinamica basata sulla ricerca
  const fullUrl = baseUrl + query;

  fetch(fullUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Errore nel ricevere i dati");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Dati ricevuti:", data);
      const dati = data.data; // Questo è l'array di canzoni/album

      // Cicliamo sulle card che hai già nel tuo HTML
      cardElements.forEach((card, index) => {
        const result = dati[index]; // Prendiamo il risultato corrispondente all'indice della card

        // Selezioniamo gli elementi interni alla card che hai appena taggato
        const title = card.querySelector(".card-title");
        const img = card.querySelector(".card-img");
        const link = card.querySelector(".details-btn"); // Se hai aggiunto un bottone/link

        if (result) {
          // SOVRASCRIVIAMO I DATI
          card.style.display = "block"; // Assicuriamoci che sia visibile
          title.innerText = result.title;
          img.src = result.album.cover_medium;
          img.alt = result.title;

          // Se vuoi aggiornare anche il link ai dettagli come nel tuo esempio:
          if (link) {
            link.href = `../../micro-componenti/album.html?AlbumID=${result.album.id}`;
          }
        } else {
          // Se l'API restituisce meno risultati delle tue card, nascondiamo quelle in eccesso
          card.style.display = "none";
        }
      });
    })
    .catch((err) => {
      console.log("Errore catch", err);
    });
};

// Listener sulla barra di ricerca
searchInput.addEventListener("input", (e) => {
  const query = e.target.value;
  if (query.length >= 3) {
    GetData(query);
  }
});

// Chiamata iniziale facoltativa per non lasciare vuoto
// GetData("queen");
