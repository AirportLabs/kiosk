// 'use strict';

$(document).ready(function() {

  // google.maps.event.addDomListener(window, 'load', initialize);
  //
  // function initialize() {
  //
  //   /* position Amsterdam */
  //   var latlng = new google.maps.LatLng(52.3731, 4.8922);
  //
  //   var mapOptions = {
  //     center: latlng,
  //     scrollWheel: false,
  //     zoom: 13
  //   };
  //
  //   var marker = new google.maps.Marker({
  //     position: latlng,
  //     url: '/',
  //     animation: google.maps.Animation.DROP
  //   });
  //
  //     // ref: https://developers.google.com/maps/documentation/javascript/styling#styling_the_default_map
  //     var styles = [{
  //       stylers: [{
  //         hue: "#00ffe6"
  //       }, {
  //         saturation: -20
  //       }]
  //     }, {
  //       featureType: "road",
  //       elementType: "geometry",
  //       stylers: [{
  //         lightness: 100
  //       }, {
  //         visibility: "simplified"
  //       }]
  //     }, {
  //       featureType: "road",
  //       elementType: "labels",
  //       stylers: [{
  //         visibility: "off"
  //       }]
  //     }];
  //
  //     map.setOptions({
  //       styles: styles
  //     });
  //
  //   var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  //   marker.setMap(map);
  //
  // };


    /* position DCA */
    var latlng = new google.maps.LatLng(38.851534, -77.040231);

  var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(38.85, -77.0333),
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      panControl: false,
      mapTypeControl: false,
      streetViewControl: false
    };

    var marker = new google.maps.Marker({
        position: latlng,
        url: '/',
        animation: google.maps.Animation.DROP
      });

    var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

      marker.setMap(map);

    // ref: https://developers.google.com/maps/documentation/javascript/styling#styling_the_default_map
    var styles = [{
      stylers: [{
        hue: "#00ffe6"
      }, {
        saturation: -20
      }]
    }, {
      featureType: "road",
      elementType: "geometry",
      stylers: [{
        lightness: 100
      }, {
        visibility: "simplified"
      }]
    }, {
      featureType: "road",
      elementType: "labels",
      stylers: [{
        visibility: "off"
      }]
    }];

    map.setOptions({
      styles: styles
    });









  // var flightPlanCoordinates = [];
  //
  // // load flight route
  //   $.ajax({
  //     url: "https://kiosk-engine.herokuapp.com/sample"
  //   }).then(function(tracks) {
  //     var waypoints = tracks.route.waypoints;
  //     flightMap(waypoints);
  //     console.log(waypoints);
  //   });
  //
  // // load flight route map
  // function flightMap(path) {
  //
  //   var mapOptions = {
  //     zoom: 6,
  //     center: new google.maps.LatLng(38.85, -77.0333),
  //     mapTypeId: google.maps.MapTypeId.TERRAIN,
  //     panControl: false,
  //     mapTypeControl: false,
  //     streetViewControl: false
  //   };
  //
  //   var map = new google.maps.Map(document.getElementById('map-canvas'),
  //     mapOptions);
  //
  //   // ref: https://developers.google.com/maps/documentation/javascript/styling#styling_the_default_map
  //   var styles = [{
  //     stylers: [{
  //       hue: "#00ffe6"
  //     }, {
  //       saturation: -20
  //     }]
  //   }, {
  //     featureType: "road",
  //     elementType: "geometry",
  //     stylers: [{
  //       lightness: 100
  //     }, {
  //       visibility: "simplified"
  //     }]
  //   }, {
  //     featureType: "road",
  //     elementType: "labels",
  //     stylers: [{
  //       visibility: "off"
  //     }]
  //   }];
  //
  //   map.setOptions({
  //     styles: styles
  //   });
  //
  //   var flightPlanCoordinates = new Array();
  //   for (var i = 0; i < path.length; i++) {
  //     var waypoint = path[i];
  //     flightPlanCoordinates.push(new google.maps.LatLng(waypoint.lat, waypoint.lon));
  //   };
  //
  //   var flightPath = new google.maps.Polyline({
  //     path: flightPlanCoordinates,
  //     geodesic: true,
  //     strokeColor: '#FF0000',
  //     strokeOpacity: 1.0,
  //     strokeWeight: 2
  //   });
  //
  //   flightPath.setMap(map);
  //
  //   // re-center the map based on the flight path (polyline)
  //   var geoPointStart = path.shift();
  //   var geoPointEnd = path.pop();
  //   var startGeoPoint = new google.maps.LatLng(geoPointStart.lat, geoPointStart.lon);
  //   var endGeoPoint = new google.maps.LatLng(geoPointEnd.lat, geoPointEnd.lon);
  //   var bounds = new google.maps.LatLngBounds();
  //   bounds.extend(endGeoPoint);
  //   bounds.extend(startGeoPoint);
  //   map.fitBounds(bounds);
  //
  // };

});
