//collegare a home page
const MainUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen"; //manca ?q= ....
const GetData = function (url) {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Errore nel ricevere i dati");
      }
      return res.json();
    })
    .then((data) => {
      console.log("dati ", data);
      //altro codice da prendere
    })
    .catch((err) => {
      console.log("Errore catch", err);
    });
};
GetData(MainUrl);
