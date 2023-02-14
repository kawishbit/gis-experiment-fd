const map = L.map("map").setView([0.51044, 101.438309], 14);

const tiles = L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abcd",
    minZoom: 0,
    maxZoom: 20,
    ext: "png",
  }
).addTo(map);

const tracks = {
  k1: {
    color: "#4b56d2",
    coords: [
      [0.4727848897192315, 101.4540253481231],
      [0.4329283773449501, 101.46277390048964],
      [0.4727848897192315, 101.4540253481231],
    ],
  },
  k2: {
    color: "#fb2576",
    coords: [
      [0.5042219575725676, 101.38641609697363],
      [0.49617578301108517, 101.5012742399315],
      [0.5042219575725676, 101.38641609697363],
    ],
  },
  k3: {
    color: "#ff7000",
    coords: [
      [0.46656302469871824, 101.35768615287391],
      [0.4775441139878654, 101.45422972289283],
      [0.46656302469871824, 101.35768615287391],
    ],
  },
  k4: {
    color: "#ffcaca",
    coords: [
      [0.5509856666104767, 101.46159145161374],
      [0.5320962329428686, 101.4477218649621],
      [0.5509856666104767, 101.46159145161374],
    ],
  },
  k5: {
    color: "#59ce8f",
    coords: [
      [0.5042219575725676, 101.38641609697363],
      [0.43299302632680103, 101.46272633580739],
      [0.5042219575725676, 101.38641609697363],
    ],
  },
};

let controls = {
  k1: null,
  k2: null,
  k3: null,
  k4: null,
  k5: null,
};

fetch("pekanbaru.json")
  .then((response) => response.json())
  .then((json) => {
    L.geoJSON(json, {
      style: function (feature) {
        return {
          weight: 6,
          fillOpacity: 0.5,
          color: "#4fd9ff",
          fillColor: "#000",
          dashArray: "12",
        };
      },
      onEachFeature: function (feature) {
        console.log(feature);
      },
    }).addTo(map);
  });

let icon = L.divIcon({
  className: "icon-wrapper",
  html: '<div class="box"><span class="material-symbols-outlined">directions_bus</span></div>',
  iconSize: [30, 42],
  iconAnchor: [15, 42],
});

let busses = [];

fetchData("bus stop in pekanbaru");
populateCustomMarkers();
populateBusLayers();
function openModal(text) {
  let modalWindow = document.getElementById("modal");

  modalWindow.classList
    ? modalWindow.classList.add("open")
    : (modalWindow.className += " " + "open");

  let modalText = document.getElementById("modal-text");
  modalText.innerText = text || "";
}

function closeModal() {
  let modalWindow = document.getElementById("modal");

  modalWindow.classList
    ? modalWindow.classList.remove("open")
    : (modalWindow.className = modalWindow.className.replace(
        new RegExp("(^|\\b)" + "open".split(" ").join("|") + "(\\b|$)", "gi"),
        " "
      ));
}
function fetchData(query) {
  let qs = encodeURIComponent(query);
  fetch(
    `https://nominatim.openstreetmap.org/search.php?q=${qs}&addressdetails=1&polygon_geojson=1&format=jsonv2`
  )
    .then((response) => response.json())
    .then((data) => {
      busses.forEach((bus) => {
        console.log(bus);
      });

      busses = data;
    })
    .finally(() => {
      populateMarkers();
    });
}

function populateMarkers() {
  busses.forEach((b) => {
    let lat = b.lat;
    let lon = b.lon;
    let marker = new L.Marker([lat, lon], {
      title: b.display_name,
      icon: icon,
    });
    marker.addTo(map).on("click", () => {
      openModal(b.display_name);
    });
  });
}
function populateCustomMarkers() {
  let customMarkers = [
    [0.5862143750062951, 101.4029962317332, "Test Detail"],
    [0.5764161148593365, 101.41810266108168, "Test Detail"],
    [0.5776408983055044, 101.42586001669302, "Test Detail"],
    [0.5833565508883577, 101.43239252668155, "Test Detail"],
    [0.5289375447825304, 101.42084032115574, "Test Detail"],
    [0.5409533171791432, 101.43319994067764, "Test Detail"],
    [0.5320273170704299, 101.44178300979007, "Test Detail"],
    [0.5267625450727371, 101.44241783105825, "Test Detail"],
    [0.522999832404562, 101.44788006279376, "Test Detail"],
    [0.5333169423499314, 101.44757660547513, "Test Detail"],
    [0.5387771799740945, 101.43240649363018, "Test Detail"],
    [0.5273676792181908, 101.41978266917478, "Test Detail"],
    [0.5121207637826554, 101.45014774699712, "Test Detail"],
    [0.5081727086896213, 101.45770084781607, "Test Detail"],
    [0.5001049364511968, 101.45649921814032, "Test Detail"],
    [0.5121207637826554, 101.49477970638178, "Test Detail"],
    [0.5088593271405176, 101.50010120923149, "Test Detail"],
    [0.5091035668242411, 101.45017775264161, "Test Detail"],
    [0.506721858850351, 101.4511004325712, "Test Detail"],
    [0.5147321116941492, 101.49525265458067, "Test Detail"],
    [0.5095357396723792, 101.50131533110142, "Test Detail"],
    [0.46550039280369543, 101.37451618047248, "Test Detail"],
    [0.4648328087381435, 101.37312027680674, "Test Detail"],
    [0.46513625604848086, 101.38003910367173, "Test Detail"],
    [0.46513625604848086, 101.38003910367173, "Test Detail"],
    [0.45455806939124804, 101.41811086339678, "Test Detail"],
    [0.4396284246570155, 101.4238158609872, "Test Detail"],
  ];
  customMarkers.forEach((b) => {
    let lat = b[0];
    let lon = b[1];
    let marker = new L.Marker([lat, lon], {
      title: b[2],
      icon: icon,
    });
    marker.addTo(map).on("click", () => {
      openModal(b[2]);
    });
  });
}

function populateBusLayers() {
  for (const prop in tracks) {
    let x = tracks[prop];
    let routing = L.Routing.control({
      waypoints: x.coords.map((x) => {
        return L.latLng(x[0], x[1]);
      }),
      fitSelectedRoutes: true,
      draggableWaypoints: false,
      routeWhileDragging: false,
      lineOptions: {
        styles: [{ color: x.color, opacity: 1, weight: 9 }],
      },
      createMarker: function () {
        return null;
      },
    }).addTo(map);
    controls[prop] = routing;
    map.addControl(controls[prop]);
    controls[prop].hide();
  }
}

function toggleLayers(key) {
  let x = controls[key];
  let elem = document.getElementById(key);
  elem.classList.toggle("active");
  if (x) {
    map.removeControl(controls[key]);
    controls[key] = null;
  } else {
    let x = tracks[key];
    let routing = L.Routing.control({
      waypoints: x.coords.map((x) => {
        return L.latLng(x[0], x[1]);
      }),
      fitSelectedRoutes: true,
      draggableWaypoints: false,
      routeWhileDragging: false,
      lineOptions: {
        styles: [{ color: x.color, opacity: 1, weight: 9 }],
      },
      createMarker: function () {
        return null;
      },
    });
    controls[key] = routing;
    map.addControl(controls[key]);
    controls[key].hide();
  }
}
