## MapQuest

[Reference](http://developer.mapquest.com/web/products/open/map)
'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png'
Satellite: 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png'


## MapBox

var tiles = L.tileLayer('http://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.mapbox.com/about/maps/">Terms and Feedback</a>',
    id: 'examples.map-20v6611k'
}).addTo(map);


## CartoDB

## Stamen

tiles_tonerBg = 'http://{s}.tile.stamen.com/toner-background/{z}/{x}/{y}.png',
      tiles_toner = 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
      tiles_waterColor = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
      tiles_osm = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

## OpenLayers

   new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
          })


          var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.Stamen({
        layer: 'watercolor'
      })
    }),
    new ol.layer.Tile({
      source: new ol.source.Stamen({
        layer: 'terrain-labels'
      })
    })
  ],
  renderer: exampleNS.getRendererFromQueryString(),
  target: 'map',
  view: new ol.View({
    center: ol.proj.transform(
        [-122.416667, 37.783333], 'EPSG:4326', 'EPSG:3857'),
    zoom: 12
  })
});