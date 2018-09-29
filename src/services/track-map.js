import * as L from "leaflet";

const MAP_TOKEN =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
const MAP_URI = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${MAP_TOKEN}`;

// const satImg = require("../assets/logo.png");

const satIcon = L.icon({
  iconUrl: "/images/sate-1.png",
  iconSize: [60, 60]
});

/**
 * Setup and return leaflet Map
 * @param {string} id - Div ID
 * @param {number} lat - Initial latitude
 * @param {number} long - Initial longitude
 * @returns {L.map} leaflet Map instance
 */
export const getMap = (id, lat, long) => {
  let map = L.map(id);

  map.setView([lat, long], 3);

  L.tileLayer(MAP_URI, {
    maxZoom: 18,
    attribution: `
      Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>
      contributors, 
        <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
      Imagery © <a href="https://www.mapbox.com/">Mapbox</a>
    `,
    id: "mapbox.streets"
  }).addTo(map);

  return map;
};

/**
 * Setup and return leaflet Marker
 * @param {L.map} map - leaflet Map instance
 * @param {number} lat - Initial latitude
 * @param {number} long - Initial longitude
 * @returns {L.marker} leaflet Marker instance
 */
export const getMarker = (map, lat, long) => {
  let marker = L.marker([lat, long], { icon: satIcon });
  marker.addTo(map);

  return marker;
};
