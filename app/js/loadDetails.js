'use strict';

// Authorize Parse SDK
Parse.initialize("3McDuSZ3koaEsVun7kJ2UhueydINWHMg1YfkCB6U", "7gR1WkaApuMum3Sc6FgVo6g8DMVNWzfjVlDsFBQD");

function loadDetails(IATA, flightNumber) {

  console.log('loadDetails() IATA: ' + IATA);
  console.log('loadDetails() flightNumber: ' + flightNumber);

  $("#main").load("ajax/details.html", function() {

    $.ajax({

      // url: 'https://kiosk-engine.herokuapp.com/flightstats/' + IATA + '/' + flightNumber + ''

      // URL for dev + mock data purposes
      url: "https://kiosk-engine.herokuapp.com/sample"

    }).then(function(results) {

      // The name of the carrier (String).
      $('#airlineName').text(results.compiledStats.airlineName);

      // The flight number (String)
      $("#flightNumber").text(results.compiledStats.flightNumber);

      // The name of the departure airport (String).
      $("#departureAirport").text(results.compiledStats.departureAirport);

      // The name of the destination airport (String).
      $("#destinationAirport").text(results.compiledStats.destinationAirport);

      // Gate departing from
      $("#departureGate").text(results.compiledStats.departureGate);

      // The published departure time for the flight provided by the airline's published operating schedule.
      $("#publishedDeparture").text(results.compiledStats.publishedDeparture);
      console.log('flight departure: ' + results.compiledStats.publishedDeparture);

      // Get estimated boarding time
      var boardingTime = moment("11:59 AM", "LT");
      boardingTime.subtract(30, 'minutes').minutes();
      console.log('boardingTime: ' + boardingTime._d);
      // var now = moment();
      var boardingStart = moment(boardingTime).fromNow();
      console.log(boardingStart);
      $("#boardingStart").text(boardingStart);

      // An estimated gate arrival time based on current observations
      $("#estimatedGateArrival").text(results.compiledStats.estimatedGateArrival);

      // Gate arriving at
      $("#destinationGate").text(results.compiledStats.destinationGate);

      // The calculated scheduled time between blocks (gate to gate) in whole minutes (Integer)
      $("#scheduledBlockMinutes").text(results.compiledStats.scheduledBlockMinutes);

      // The calculated scheduled time in the air (runway to runway) in whole minutes (Integer)
      $("#scheduledAirMinutes").text(results.compiledStats.scheduledAirMinutes);

      var scheduledAirProgressBar = '<div class="progress">'
      scheduledAirProgressBar += '<div class="progress-bar progress-bar-warning" style="width: ' + results.compiledStats.scheduledTaxiOutMinutesStats + '%"></div>';
      scheduledAirProgressBar += '<div class="progress-bar progress-bar-info" style="width: ' + results.compiledStats.scheduledAirMinutesStats + '%">in the air</div>';
      scheduledAirProgressBar += '<div class="progress-bar progress-bar-warning" style="width: ' + results.compiledStats.scheduledTaxiInMinutesStats + '%"></div>';
      scheduledAirProgressBar += '</div>';
      $("#scheduledAirProgressBar").html(scheduledAirProgressBar);

      // The descriptive name for the equipment type. (String)
      $("#equipment").text(results.compiledStats.equipment);

      // Tail number for flight
      $("#tailNumber").text(results.compiledStats.tailNumber);

      // $("#firstClass").text(results.compiledStats.firstClass);
      // $("#businessClass").text(results.compiledStats.businessClass);
      // $("#premiumEconomyClass").text(results.compiledStats.premiumEconomyClass);
      // $("#economyClass").text(results.compiledStats.economyClass);

      // send gate information to load food & dining options
      loadNearGate(results.compiledStats.gateLocation);

      // percent on-time
      $("#ontimePercent").text(results.ratings.ontimePercent);

      // star rating
      $("#allOntimeStars").rating('update', results.ratings.allOntimeStars);

      // The primary customer service phone number for the carrier (String).
      $("#phoneNumber").text(results.compiledStats.phoneNumber);

      // Baggage claim at destination airport
      $("#baggageClaim").text(results.compiledStats.baggageClaim);

      // weather at destination airport
      $("#wind").text(results.weather.wind);
      $("#temp").text(results.weather.temp);
      $("#weather").text(results.weather.type);
      $("#visibility").text(results.weather.visibility);

      // build flight map
      var path = results.route.waypoints;
      flightMap(path);

    });

  });

};

// load flight route map
function flightMap(path) {

  // build starting route
  var route = [];

  // starting gate
  var waypoint = {};
  waypoint.lon = -77.041600;
  waypoint.lat = 38.852477;
  route.push(waypoint);

  // rotate point
  var waypoint = {};
  waypoint.lon = -77.041842;
  waypoint.lat = 38.852972;
  route.push(waypoint);

  // turn onto taxi way
  var waypoint = {};
  waypoint.lon = -77.039671;
  waypoint.lat = 38.853494;
  route.push(waypoint);

  // turn point
  var waypoint = {};
  waypoint.lon = -77.038352;
  waypoint.lat = 38.843039;
  route.push(waypoint);

  // start of runway 1
  var waypoint = {};
  waypoint.lon = -77.036910;
  waypoint.lat = 38.843109;
  route.push(waypoint);

  // end of runway 1 (Gravelly Point)
  var waypoint = {};
  waypoint.lon = -77.038927;
  waypoint.lat = 38.866278;
  route.push(waypoint);

  // Gets all but the first element of path
  var editedPath = _.rest(path);

  // merge route with editedPath
  for (var i = 0; i < editedPath.length; i++) {
    var waypoint = editedPath[i];
    route.push(waypoint);
  };

  // remove the first (starting) coordinates
  // var route = path.shift();
  // var route = path.shift();
  // var route = path;

  // var first = _.first(route);
  // console.log(first);

  // add new coordinates to the route/path
  // route = route.unshift({lon:,lat:},{lon:,lat:});

  var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(38.85, -77.0333),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    panControl: false,
    mapTypeControl: false,
    streetViewControl: false
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

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

  // var flightPlanCoordinates = new Array();
  // for (var i = 0; i < path.length; i++) {
  //   var waypoint = path[i];
  //   flightPlanCoordinates.push(new google.maps.LatLng(waypoint.lat, waypoint.lon));
  // };

  var flightPlanCoordinates = new Array();
  for (var i = 0; i < route.length; i++) {
    var waypoint = route[i];
    flightPlanCoordinates.push(new google.maps.LatLng(waypoint.lat, waypoint.lon));
  };

  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);

  // re-center the map based on the flight path (polyline)
  var geoPointStart = path.shift();
  var geoPointEnd = path.pop();
  var startGeoPoint = new google.maps.LatLng(geoPointStart.lat, geoPointStart.lon);
  var endGeoPoint = new google.maps.LatLng(geoPointEnd.lat, geoPointEnd.lon);
  var bounds = new google.maps.LatLngBounds();
  bounds.extend(endGeoPoint);
  bounds.extend(startGeoPoint);
  map.fitBounds(bounds);

};


function loadNearGate(gateLocation) {
  console.log('gateLocation: ' + gateLocation);
  var Locations = Parse.Object.extend("DCAFoodAndRetail");
  var query = new Parse.Query(Locations);
  query.equalTo("Location", gateLocation);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " scores.");
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        if (object.get('Type') === "Eateries & Snacks") {
          $("#food").append('<li>' + object.get('Name') + '</li>');
        } else if (object.get('Type') === "Newsstands") {
          $("#retail").append('<li>' + object.get('Name') + '</li>');
        } else if (object.get('Type') === "Sit Down Restaurants & Bars") {
          $("#food").append('<li>' + object.get('Name') + '</li>');
        } else {
          $("#retail").append('<li>' + object.get('Name') + '</li>');
        };
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
};
