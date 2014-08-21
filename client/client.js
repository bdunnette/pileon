Meteor.subscribe('piles');Template.pilesView.helpers({

});

Template.pilesView.events({

});

Template.pilesView.rendered = function () {
  L.Icon.Default.imagePath = 'packages/leaflet/images';

  var map = L.map('map', {
    doubleClickZoom: false
  }).setView([44.95, -93.2], 12);

  if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position){
map.setView([position.coords.latitude, position.coords.longitude], 13);
});
};

  L.tileLayer.provider('OpenStreetMap.BlackAndWhite').addTo(map);

  map.on('dblclick', function (event) {
    Piles.insert({
      latlng: event.latlng,
      user: Meteor.userId()
    });
  });

  var compostIcon = L.icon({iconUrl:'img/CompostPile.png'});

  var query = Piles.find();
  query.observe({
    added: function (document) {
      var marker = L.marker(document.latlng, {icon:compostIcon}).addTo(map)
	//.bindPopup("A pile of... something.")
        .on('click', function (event) {
          map.removeLayer(marker);
          Piles.remove({
            _id: document._id
          });
        });
    },
    removed: function (oldDocument) {
      layers = map._layers;
      var key, val;
      for (key in layers) {
        val = layers[key];
        if (val._latlng) {
          if (val._latlng.lat === oldDocument.latlng.lat && val._latlng.lng === oldDocument.latlng.lng) {
            map.removeLayer(val);
          }
        }
      }
    }
  });
};
