'use strict';

// console.log(flights);

function loadAirline(IATA) {

  console.log('IATA: ' + IATA);

  $("#contentarea").load("ajax/flights.html", function() {

    alert("Load was performed.");

    $.each(flights[IATA], function(index, value) {

      var html = '<a href="#" class="list-group-item">';
      html += '<h4 class="list-group-item-heading">' + value.airline + ' ' + value.number + '</h4>';
      html += '<p class="list-group-item-text">...</p>';
      html += '</a>';
      $("#flightsList").append(html);

    });

  });

};
