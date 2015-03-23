'use strict';

// console.log(flights);

function loadAirline(IATA) {

  console.log('IATA: ' + IATA);

  $("#contentarea").load("ajax/flights.html", function() {

    $.each(flights[IATA], function(index, value) {

      var html = '<a onClick="loadDetails(' + IATA + ',' + value.number + ')" class="list-group-item"><div class="row">';
      html += '<div class="col-md-4">' + value.destination + '</div>';
      html += '<div class="col-md-4">' + value.airline + ' ' + value.number + '</div>';
      html += '<div class="col-md-4"><span class="badge">' + value.departure + '</span></div>';
      html += '</div></a>';
      $("#flightsList").append(html);

    });

  });

};
