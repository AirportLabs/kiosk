'use strict';

// object for "processed" flight records
var flights = {};
flights.US = [];
flights.WN = [];
flights.B6 = [];
flights.AC = [];
flights.VX = [];
flights.DL = [];
flights.UA = [];
flights.AA = [];
flights.DL = [];
flights.US = [];
flights.DL = [];
flights.F9 = [];
flights.AS = [];
flights.SY = [];

$(document).ready(function() {

  $.ajax({
    url: "http://www.mwaa.com/net/data/departusres_reagan.json"
    // url: "http://localhost:9000/mock/departures_reagan.json"
  }).then(function(results) {

    for (var i = 0; i < results.length; i++) {

      var flight = results[i];

      // console.log(flight);

      // skip record if flight has already departed
      if (flight.Status != "Departed") {

        async.parallel({

            // Add IATA airline code
            IATA: function(callback) {
              if (flight.Airline === 'US Airways') {
                var IATA = 'US'
              } else if (flight.Airline === 'Southwest Airlines') {
                var IATA = 'WN'
              } else if (flight.Airline === 'JetBlue') {
                var IATA = 'B6'
              } else if (flight.Airline === 'Air Canada') {
                var IATA = 'AC'
              } else if (flight.Airline === 'Virgin America') {
                var IATA = 'VX'
              } else if (flight.Airline === 'Delta') {
                var IATA = 'DL'
              } else if (flight.Airline === 'United') {
                var IATA = 'UA'
              } else if (flight.Airline === 'American') {
                var IATA = 'AA'
              } else if (flight.Airline === 'Delta Shuttle') {
                var IATA = 'DL'
              } else if (flight.Airline === 'Frontier') {
                var IATA = 'F9'
              } else if (flight.Airline === 'Alaska') {
                var IATA = 'AS'
              } else if (flight.Airline === 'Sun Country Airlines') {
                var IATA = 'SY'
              } else {
                'AIRLINE NOT RECOGNIZED: NEED IATA CODE FOR ' + flight.Airline
              }
              callback(null, IATA);
            },

            // clean up airline name
            airline: function(callback) {
              if (flight.Airline === 'Delta Shuttle') {
                var airline = 'Delta'
              } else if (flight.Airline === 'American') {
                var airline = 'American Airlines'
              } else {
                var airline = flight.Airline;
              };
              callback(null, airline);
            },

            // format departure time
            departure: function(callback) {
              var departure = moment(flight.Scheduled).format("LT");
              callback(null, departure);
            }

          },
          function(err, results) {
            results.status = flight.Status;
            results.number = flight.Number;
            results.destination = flight.Location;
            results.gate = flight.Gate;
            flights[results.IATA].push(results);
          });

      }

    }

    console.log(flights);

  });

});
