'use strict';

function loadAirline(IATA) {
  alert('IATA: ' + IATA);
  $("#contentarea").load("ajax/flights.html");
};
