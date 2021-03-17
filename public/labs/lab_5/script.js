//const { data } = require("cypress/");

function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  var mymap = L.map("mapid").setView(
    [38.980415024545614, -76.94161850225373],
    13
  );
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1Ijoia3RzYWk5OSIsImEiOiJja21iZ2JrMTEwMm80MndtY2Z5NXl4eXF3In0.eafHjBkWGvW2AQ4QG7pEOg",
    }
  ).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const form = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search");
  const suggestions = document.querySelector(".suggestions");

  const request = await fetch("/api");
  const cities = await request.json();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    //console.log(searchInput.value);
    //console.log(cities);
    const filtered = cities.filter(
      (item) => item.zip.includes(searchInput.value) && item.geocoded_column_1
    ).slice(0,5);
    //console.table(filtered);

    //Create Feature Group
    var featLoc = L.featureGroup();
    featLoc.addTo(mapObjectFromFunction);

    filtered.forEach((item) => {
      longLat = item.geocoded_column_1.coordinates;
      //console.log(longLat[0], longLat[1]);
      L.marker([longLat[1], longLat[0]]).addTo(featLoc);

      const appendCities = document.createElement("li");
      appendCities.classList.add("block");
      appendCities.classList.add("list-item");
      appendCities.innerHTML = `
       <li>
           <ul>
               <li class="address"> ${item.category} — ${item.name} ${item.address_line_1} ${item.zip}</li>
           </ul>
       </li>
   `;
      suggestions.append(appendCities);
    });
    mapObjectFromFunction.fitBounds(featLoc.getBounds(), { padding: [20, 20] });
    console.log(suggestions);
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
