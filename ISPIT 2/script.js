function search() {
  const searchInput = document.getElementById("searchInput").value;
  const resultsTable = document.getElementById("resultsBody");
  const loader = document.getElementById("loader");
  const results = document.getElementById("results");

  // Loader dok se podaci skidaju
  loader.style.display = "block";
  results.style.display = "none";
  resultsTable.innerHTML = "";

  fetch(`https://api.tvmaze.com/search/shows?q=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      // Sakrij loader i prikaži rezultate
      loader.style.display = "none";
      results.style.display = "block";

      if (data.length === 0) {
        resultsTable.innerHTML = "<h3>Nema rezultata!!</h3>";
      } else {
        data.forEach((element) => {
          const row = document.createElement("tr");
          const naslov = document.createElement("td");
          const ocjena = document.createElement("td");
          const zanr = document.createElement("td");
          const opis = document.createElement("td");

          naslov.textContent = element.show.name;
          ocjena.textContent = element.show.rating.average || "Nema";
          zanr.textContent = element.show.genres || "Nema";
          opis.innerHTML = element.show.summary || "Nema";

          row.appendChild(naslov);
          row.appendChild(ocjena);
          row.appendChild(zanr);
          row.appendChild(opis);

          resultsTable.appendChild(row);
        });
      }
    })
    .catch((error) => {
      console.error("Greška pri učitavanju", error);
    });
}
