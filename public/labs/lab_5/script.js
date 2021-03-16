//const { data } = require("cypress/");

function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  var mymap = L.map("mapid").setView([38.980415024545614, -76.94161850225373], 13);
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

  function findMatches(wordToMatch, cities) {
    return cities.filter((place) => {
      const regex = new RegExp(wordToMatch, "gi");
      return (
        place.zip.match(regex)
      );
    });
  }

  function displayMatches(event) {
    // Workaround to prevent empty search bar from displaying the entire array
    if (event.target.value === "") {
      suggestions.innerHTML = "";
      return;
    }

    const matchArray = findMatches(event.target.value, cities);
    const html = matchArray
      .map((place) => {
        return `
                <li>
                    <ul>
                        <li class="address"> ${place.category} — ${place.name} ${place.address_line_1} ${place.zip}</li>
                    </ul>
                </li>
            `;
      })
      .join("");

    suggestions.innerHTML = html;
  }
  
  const form = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search");

  const request = await fetch('/api', { method: "get" });
  const cities = await request.json();

  function handleForm(event) { event.preventDefault(); } 

  searchInput.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Form submitted');
  })
  
}

async function windowActions() {
  const map = mapInit();
  //await dataHandler(map);
}

window.onload = windowActions;
