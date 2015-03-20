'use strict';

$(document).ready(function() {

  // $.ajax({
  //   url: "http://localhost:9000/mock/departures_reagan.json"
  // }).then(function(data) {
  //
  //   // $('.greeting-id').append(data.id);
  //   // $('.greeting-content').append(data.content);
  //
  //   $.each(data, function(index, value) {
  //     console.log(index + ": " + value);
  //   });
  //
  // });

  $.ajax({
    url: "http://localhost:9000/mock/departures_reagan.json"
  }).then(function(results) {

    for (var i = 0; i < results.length; i++) {

      var flight = results[i];
      console.log(flight.Airline + ' ' + flight.Number);

      // skip record if flight has already departed
      if (flight.Status === "Departed") {

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

            two: function(callback) {
              setTimeout(function() {
                callback(null, 2);
              }, 100);
            }

          },
          function(err, results) {
            // results is now equals to: {one: 1, two: 2}
            console.log(results);
          });

      }

    }

  });

});
