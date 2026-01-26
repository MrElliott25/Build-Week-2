const AlbumID = 12209331; //da cancellare
const GetAlbum = function () {
  fetch(MainUrl + AlbumID)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Errore nel ricevere i dati");
      }
      return res.json();
    })
    .then((data) => {
      console.log("dati ", data);
      console.log(data.title);
      const row = document.getElementById("row-album");
      data.forEach((element) => {
        row.innerHTML += `
        <div class="col">
          <h5 class="m-0 p-0"># ${element.title}</h5>
          <p>${element.artist.name}</p>
        </div>
        <div class="col">${element.rank}</div>
        <div class="col">${element.duration}</div>`;

        /* `
                <div class="col col-12 col-md-8 col-lg-6">
            <div class="card d-flex">
                <img src="${element.cover}" class="card-img-top" alt="${element.title}">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.artist.name}</p>
                    <p class="card-text">${element.duration}</p>
                    <p class="card-text">${element.rank}€</p>
                </div>
            </div>
        </div>
        `; */
      });
    })
    .catch((err) => {
      console.log("Errore catch", err);
    });
};
GetAlbum();
