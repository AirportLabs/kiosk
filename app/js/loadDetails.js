'use strict';

function loadDetails(IATA, flightNumber) {

  console.log('loadDetails() IATA: ' + IATA);
  console.log('loadDetails() flightNumber: ' + flightNumber);

  $("#contentarea").load("ajax/details.html", function() {

    // get flight ratings
    $.ajax({
      // url: 'https://api.flightstats.com/flex/ratings/rest/v1/json/flight/' + carrier + '/' + flightNumber + '?appId=63121b9c&appKey=510908f052a4f6b24ab9515c6609225d'
      url: "http://localhost:9000/mock/RatingsAPI.json"
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
    $.ajax({
      // url: 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/' + carrier + '/' + flightNumber + '/dep/' + year + '/' + month + '/' + date + '?appId=63121b9c&appKey=510908f052a4f6b24ab9515c6609225d&utc=false&airport=DCA'
      url: "http://localhost:9000/mock/FlightStatusAPI.json"
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

      // The published departure time for the flight provided by the airline's published operating schedule.
      var publishedDeparture = moment(operationalTimes.publishedDeparture.dateLocal).format("LT");
      $("#publishedDeparture").text(publishedDeparture);

      // An estimated gate arrival time based on current observations
      var estimatedGateArrival = moment(operationalTimes.estimatedGateArrival.dateLocal).format("LT");
      $("#estimatedGateArrival").text(estimatedGateArrival);

      // // compile information for customer's destination airport
      //
      // // The name of the airport (String).
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

      // Boolean value indicating if the equipment type uses TurboProp propulsion (Boolean).
      if (equipments.turboProp === true) {
        var turboProp = 'Yes'
      } else {
        var turboProp = 'No'
      };
      $("#turboProp").text(turboProp);

      // Boolean value indicating if the equipment type uses jet propulsion (Boolean).
      if (equipments.jet === true) {
        var jet = 'Yes'
      } else {
        var jet = 'No'
      };
      $("#jet").text(jet);

      // Boolean value indicating if the equipment type is a wide-body airframe (Boolean).
      if (equipments.widebody === true) {
        var widebody = 'Yes'
      } else {
        var widebody = 'No'
      };
      $("#widebody").text(widebody);

      // Boolean value indicating if the equipment type is a regional airframe (Boolean).
      if (equipments.regional === true) {
        var regional = 'Yes'
      } else {
        var regional = 'No'
      };
      $("#regional").text(regional);

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
      var scheduledAirMinutesStats = ( flightDurations.scheduledAirMinutes / flightDurations.scheduledBlockMinutes ) * 100;
      var scheduledTaxiOutMinutesStats = ( flightDurations.scheduledTaxiOutMinutes / flightDurations.scheduledBlockMinutes ) * 100;
      var scheduledTaxiInMinutesStats = ( flightDurations.scheduledTaxiInMinutes / flightDurations.scheduledBlockMinutes ) * 100;
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

    });

  });

};
