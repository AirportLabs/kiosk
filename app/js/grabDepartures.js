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
                IATA = 'US'
              } else if (flight.Airline === 'Southwest Airlines') {
                IATA = 'WN'
              } else if (flight.Airline === 'JetBlue') {
                IATA = 'XXX'
              } else if (flight.Airline === 'Air Canada') {
                IATA = 'XXX'
              } else if (flight.Airline === 'Virgin America') {
                IATA = 'XXX'
              } else if (flight.Airline === 'Delta') {
                IATA = 'XXX'
              } else if (flight.Airline === 'United') {
                IATA = 'XXX'
              } else if (flight.Airline === 'American') {
                IATA = 'XXX'
              } else if (flight.Airline === 'Delta Shuttle') {
                IATA = 'XXX'
              } else if (flight.Airline === 'Frontier') {
                IATA = 'XXX'
              } else if (flight.Airline === 'Alaska') {
                IATA = 'XXX'
              } else if (flight.Airline === 'Sun Country Airlines') {
                IATA = 'XXX'
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



  // async.waterfall([
  //   // grab json from MWAA web service
  //   function(callback) {
  //     $.ajax({
  //       url: "http://localhost:9000/mock/departures_reagan.json"
  //     }).then(function(data) {
  //       var obj = jQuery.parseJSON(data);
  //       callback(null, obj);
  //     });
  //   },
  //   function(obj, callback) {
  //     console.log(obj);
  //     callback(null, 'three');
  //   },
  //   function(arg1, callback) {
  //     // arg1 now equals 'three'
  //     callback(null, 'done');
  //   }
  // ], function(err, result) {
  //   // result now equals 'done'
  // });



  // Air Canada
  // AC
  //
  // Alaska Airlines
  // AS
  //
  // American Airlines
  // AA
  //
  // Delta Air Lines(DL)
  //
  // Frontier Airlines(F9)
  //
  // JetBlue Airways(B6)
  //
  // Southwest Airlines(WN)
  //
  // Sun Country Airlines(SY)
  //
  // United Airlines(UA)
  //
  // US Airways(US)
  //
  // Virgin America(VX)

});
