'use strict';

// Authorize Parse SDK
Parse.initialize("3McDuSZ3koaEsVun7kJ2UhueydINWHMg1YfkCB6U", "7gR1WkaApuMum3Sc6FgVo6g8DMVNWzfjVlDsFBQD");

function loadDetails(IATA, flightNumber) {

  console.log('loadDetails() IATA: ' + IATA);
  console.log('loadDetails() flightNumber: ' + flightNumber);

  $("#contentarea").load("ajax/details.html", function() {

    // get flight ratings
    $.ajax({

      // standard URL for use with CORS Google Chrome entension
      // url: 'https://api.flightstats.com/flex/ratings/rest/v1/json/flight/' + IATA + '/' + flightNumber + '?appId=63121b9c&appKey=510908f052a4f6b24ab9515c6609225d'

      // URL for use without CORS Google Chrome entension
      url: 'https://mwaa-repeater.herokuapp.com/flex/ratings/rest/v1/json/flight/' + IATA + '/' + flightNumber + '?appId=63121b9c&appKey=510908f052a4f6b24ab9515c6609225d'

      // url: "http://localhost:9000/mock/RatingsAPI.json"

    }).then(function(results) {
      var ratings = results.ratings[0];
      // percent on-time
      var ontimePercent = numeral(ratings.ontimePercent).format('0.0%');
      $("#ontimePercent").text(ontimePercent);
      // star rating
      var allOntimeStars = numeral(ratings.allOntimeStars).format('0.0');
      $("#allOntimeStars").rating('update', allOntimeStars);
    });

    // get flight stats
    var year = moment().year();
    var month = moment().month() + 1;
    var date = moment().date();
    $.ajax({

      // standard URL for use with CORS Google Chrome entension
      // url: 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/' + IATA + '/' + flightNumber + '/dep/' + year + '/' + month + '/' + date + '?appId=63121b9c&appKey=510908f052a4f6b24ab9515c6609225d&utc=false&airport=DCA'

      // URL for use without CORS Google Chrome entension
      url: 'https://mwaa-repeater.herokuapp.com/flex/flightstatus/rest/v2/json/flight/status/' + IATA + '/' + flightNumber + '/dep/' + year + '/' + month + '/' + date + '?appId=63121b9c&appKey=510908f052a4f6b24ab9515c6609225d&utc=false&airport=DCA'

      // url: "http://localhost:9000/mock/FlightStatusAPI.json"

    }).then(function(results) {

      var airlines = results.appendix.airlines[0];

      // The name of the carrier (String).
      $("#airlineName").text(airlines.name);

      // The flight number (as served in function request)
      $("#flightNumber").text(flightNumber);

      // The primary customer service phone number for the carrier (String).
      $("#phoneNumber").text(airlines.phoneNumber);

      var flightStats = results.flightStatuses[0];

      var operationalTimes = flightStats.operationalTimes;
      console.log(operationalTimes);

      // The published departure time for the flight provided by the airline's published operating schedule.
      var publishedDeparture = moment(operationalTimes.publishedDeparture.dateLocal).format("LT");
      $("#publishedDeparture").text(publishedDeparture);

      // An estimated gate arrival time based on current observations
      var dateLocal;
      dateLocal = operationalTimes.scheduledGateArrival.dateLocal;
      var estimatedGateArrival = moment(dateLocal).format("LT");
      $("#estimatedGateArrival").text(estimatedGateArrival);

      var departureAirport = results.appendix.airports[0];

      // The name of the departure airport (String).
      $("#departureAirport").text(departureAirport.name);

      // Gate departing from
      $("#departureGate").text(flightStats.airportResources.departureTerminal + "-" + flightStats.airportResources.departureGate);

      // send gate information to load food & dining options

      var gate = flightStats.airportResources.departureGate;
      if (gate > 34 || gate === "35X") {
        var gateLocation = 'Terminal C'
      } else if (gate > 22 && gate < 35) {
        var gateLocation = 'Terminal B/C'
      } else if (gate > 9 && gate < 23) {
        var gateLocation = 'Terminal B'
      } else if (gate < 10) {
        var gateLocation = 'Terminal A'
      };
      loadNearGate(gateLocation);

      var destinationAirport = results.appendix.airports[1];

      // The name of the destination airport (String).
      $("#destinationAirport").text(destinationAirport.name);

      var arrivingTerminal = flightStats.airportResources.arrivalTerminal;
      var arrivingGate = flightStats.airportResources.arrivalGate;

      // Gate arriving at
      if (arrivingTerminal != undefined) {
        $("#destinationGate").text(arrivingTerminal + "-" + arrivingGate);
      } else {
        $("#destinationGate").text(arrivingGate);
      }

      // Baggage claim at destination airport
      var baggageClaim = flightStats.airportResources.baggage;
      if (baggageClaim === "") {
        var baggageClaim = "Not known at this time"
      };
      $("#baggageClaim").text(baggageClaim);

      // get weather at destination airport
      destinationWeather(destinationAirport.iata);

      // specs.destAirport.airportName = specsResponse.appendix.airports[0].name;
      //
      // // The IATA code for the airport (String).
      // specs.destAirport.iata = specsResponse.appendix.airports[0].iata;
      //
      // // The local time at the Airport when the request was made in ISO-8601 format. yyyy-MM-dd'T'HH:mm:ss.SSS.
      // specs.destAirport.localTime = specsResponse.appendix.airports[0].localTime;
      //
      // // The latitude of the airport in decimal degrees (Double).
      // specs.destAirport.latitude = specsResponse.appendix.airports[0].latitude;
      //
      // // The longitude of the airport in decimal degrees (Double).
      // specs.destAirport.longitude = specsResponse.appendix.airports[0].longitude;

      var equipments = results.appendix.equipments[0]

      // The descriptive name for the equipment type. (String)
      var equipment = _.trimRight(equipments.name, ' Passenger');
      $("#equipment").text(equipment);

      // Tail number for flight
      $("#tailNumber").text(flightStats.flightEquipment.tailNumber);

      // // The current status of the flight.
      // // [A] Active
      // // [C]	Canceled
      // // [D]	Diverted
      // // [DN] Data source needed
      // // [L]	Landed
      // // [NO] Not Operational
      // // [R]	Redirected
      // // [S] Scheduled
      // // [U]	Unknown

      // IATA service classes offered for the flight. (String)
      // [F] first class
      // [J] business class
      // [W] premium economy
      // [Y] economy class

      var serviceClasses = flightStats.schedule.serviceClasses;
      var firstClass = _.includes(serviceClasses, 'F');
      var businessClass = _.includes(serviceClasses, 'J');
      var premiumEconomyClass = _.includes(serviceClasses, 'W');
      var economyClass = _.includes(serviceClasses, 'Y');

      if (firstClass === true) {
        firstClass = 'Yes'
      } else {
        firstClass = 'No'
      };
      $("#firstClass").text(firstClass);

      if (businessClass === true) {
        businessClass = 'Yes'
      } else {
        businessClass = 'No'
      };
      $("#businessClass").text(businessClass);

      if (premiumEconomyClass === true) {
        premiumEconomyClass = 'Yes'
      } else {
        premiumEconomyClass = 'No'
      };
      $("#premiumEconomyClass").text(premiumEconomyClass);

      if (economyClass === true) {
        economyClass = 'Yes'
      } else {
        economyClass = 'No'
      };
      $("#economyClass").text(economyClass);

      var flightDurations = flightStats.flightDurations;

      // The calculated scheduled time between blocks (gate to gate) in whole minutes (Integer)
      $("#scheduledBlockMinutes").text(flightDurations.scheduledBlockMinutes);

      // The calculated scheduled time in the air (runway to runway) in whole minutes (Integer)
      $("#scheduledAirMinutes").text(flightDurations.scheduledAirMinutes);
      var scheduledAirMinutesStats = (flightDurations.scheduledAirMinutes / flightDurations.scheduledBlockMinutes) * 100;
      var scheduledTaxiOutMinutesStats = (flightDurations.scheduledTaxiOutMinutes / flightDurations.scheduledBlockMinutes) * 100;
      var scheduledTaxiInMinutesStats = (flightDurations.scheduledTaxiInMinutes / flightDurations.scheduledBlockMinutes) * 100;
      var scheduledAirProgressBar = '<div class="progress">'
      scheduledAirProgressBar += '<div class="progress-bar progress-bar-warning" style="width: ' + scheduledTaxiOutMinutesStats + '%"></div>';
      scheduledAirProgressBar += '<div class="progress-bar progress-bar-info" style="width: ' + scheduledAirMinutesStats + '%"></div>';
      scheduledAirProgressBar += '<div class="progress-bar progress-bar-warning" style="width: ' + scheduledTaxiInMinutesStats + '%"></div>';
      scheduledAirProgressBar += '</div>';
      $("#scheduledAirProgressBar").html(scheduledAirProgressBar);

      // // The calculated scheduled time for the plane to taxi out and take off (gate to runway) in whole minutes (Integer)
      // $("#scheduledTaxiOutMinutes").text(flightDurations.scheduledTaxiOutMinutes);

      // // The calculated scheduled time for the plane to land and taxi in (runway to gate) in whole minutes (Integer)
      // $("#scheduledTaxiInMinutes").text(flightDurations.scheduledTaxiInMinutes);

      // get flight route
      var flightId = flightStats.flightId;
      loadRoute(flightId);

    });

  });

};

// get weater at destination airport
function destinationWeather(destIATA) {
  $.getJSON("http://services.faa.gov/airport/status/" + destIATA + "?format=application/json", function(data) {
    $("#wind").text(data.weather.wind);
    $("#temp").text(data.weather.temp);
    $("#weather").text(data.weather.weather);
    $("#visibility").text(data.weather.visibility);
  });
};

var flightPlanCoordinates = [];

// load flight route
function loadRoute(flightId) {
  $.ajax({

    // standard URL for use with CORS Google Chrome entension
    // url: 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/track/' + flightId + '?appId=63121b9c&appKey=510908f052a4f6b24ab9515c6609225d&includeFlightPlan=true&maxPositions=2'

    // URL for use without CORS Google Chrome entension
    url: 'https://mwaa-repeater.herokuapp.com/flex/flightstatus/rest/v2/json/flight/track/' + flightId + '?appId=63121b9c&appKey=510908f052a4f6b24ab9515c6609225d&includeFlightPlan=true&maxPositions=2'

    //
    // url: "http://localhost:9000/mock/flightRoute.json"

  }).then(function(tracks) {
    var waypoints = tracks.flightTrack.waypoints;
    flightMap(waypoints);
  });
}

// load flight route map
function flightMap(path) {

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

  var flightPlanCoordinates = new Array();
  for (var i = 0; i < path.length; i++) {
    var waypoint = path[i];
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
          $("#food").append('<li class="list-group-item">' + object.get('Name') + '</li>');
        } else if (object.get('Type') === "Newsstands") {
          $("#retail").append('<li class="list-group-item">' + object.get('Name') + '</li>');
        } else if (object.get('Type') === "Sit Down Restaurants & Bars") {
          $("#food").append('<li class="list-group-item">' + object.get('Name') + '</li>');
        } else {
          $("#retail").append('<li class="list-group-item">' + object.get('Name') + '</li>');
        };
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
};
