//collegare a home page
const mainUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen";

const getEvents = function () {
  fetch(mainUrl)
    .then((res) => {
      console.log("RESPONSE", res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("La response ha un problema");
      }
    })
    .then((data) => {
      console.log("EVENTI RICEVUTI:", data);
    });
}.catch((err) => {
  console.log("ERRORE NELLA FETCH", err);
});

getEvents();
