// Create a map object.
let myMap = L.map("map", {
    center: [40.5994, -110.6731],
    zoom: 2.5
  });
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

function markerColor(depth) {
    if (depth > 90) {
        return '#FF0000';
    } else if (depth > 70) {
        return '#FF4500';
    } else if (depth > 50) {
        return '#FF8C00';
    } else if (depth > 30) {
        return '#FFD700';
    } else if (depth > 10) {
        return '#ADFF2F';
    } else if (depth >= -10) {
        return '#00FF00';
    } else {
        return '#00FF00';
    }
}
  
// Function to get size of circle based on magnitude
function markerSize(magnitude) {
    return magnitude * 4;
}
  
// Function to marker
function createMarkers(earthquake) {
    let longitude = earthquake.geometry.coordinates[0];
    let latitude = earthquake.geometry.coordinates[1];
    let depth = earthquake.geometry.coordinates[2];
    let magnitude = earthquake.properties.mag;
    let location = earthquake.properties.place;
  
    // marker settings were guided by chatgpt
    let marker = L.circleMarker([latitude, longitude], {
      radius: markerSize(magnitude),
      fillColor: markerColor(depth),
      weight: 1,
      color: '#000',
      fillOpacity: 0.8
    }).bindPopup("<h3><h3>Location: " + location + "<h3><h3>Magnitude: " + magnitude + "<h3><h3>Depth: " + depth + "</h3>").addTo(myMap);
}

  
// Perform an API call to the earthquake API. Call createMarkers when it completes.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson").then(function(data) {
    let earthquakes = data.features;
  
// Add markers to each earthquake
    earthquakes.forEach(createMarkers);
});