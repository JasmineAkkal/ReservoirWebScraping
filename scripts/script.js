var map = new L.Map('leaflet', {
  'center': [0, 0],
  'zoom': 0,
  'layers': [
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    })
  ]
});

var content = '<svg id="gauge" width="100" height="100"></svg>'

new L.Marker([0, -45]).bindPopup(content, {'value': 33}).addTo(map)
new L.Marker([0, 45]).bindPopup(content, {'value': 66}).addTo(map)

map.on('popupopen', function (e) {
  loadLiquidFillGauge('gauge', e.popup.options.value);
})