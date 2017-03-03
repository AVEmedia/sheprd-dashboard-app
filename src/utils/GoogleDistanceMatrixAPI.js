import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export function getDistance(hub,locations){
    delete hub.location.location;
    let address = [];
    for(key in hub.location){
      if(hub.location[key].length > 0){
        address.push(hub.location[key]);
      }
    };
    let origins = [address.join(' ').replace(/\s/g,'+')];
//       let origins = [new google.maps.LatLng(hub.lat,hub.lng)];

    let destinations = [];
    locations.forEach((point,i) => {
      delete point.location.location;
      //console.log(point.location);
      let address = [];
      for(key in point.location){
        if(point.location[key].length > 0){
          address.push(point.location[key]);
        }
      };
      //console.log(address.join(' ').replace(/\s/g,'+'));
      destinations.push(address.join(' ').replace(/\s/g,'+'));
//         destinations.push(new google.maps.LatLng(point.lat,point.lng));
    });

    callDistanceMatrix( origins, destinations, getStartingDestination );
  }

export function callDistanceMatrix( origins, destinations, callback=function(){}){
    // Make call to Google Distance Matrix API
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: origins, // Current location
      destinations: destinations, // Target destinations
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(Date.now() + 10000),  // for the time N milliseconds from now.
        trafficModel: "optimistic"
      },
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    }, callback());
  }

export function getStartingDestination(response, status) {
    if (status === google.maps.DistanceMatrixStatus.OK) {
      let origins = response.originAddresses;
      let destinations = response.destinationAddresses;

      //console.log(response);
      response.rows.forEach((row,i) => {
        let addresses = [];
        let distances = [];
        let elements = row.elements;
        elements.forEach((element,i) => {
          element.address = {
            value: destinations[i],
            formatted: destinations[i].replace(/\,/g,'').replace(/\s/g,'+')
          };
          console.log(element);
          addresses.push(element);

          distances.push(element.distance.value);
        });

        // Closest target destination to current location
        let closest;
        addresses.forEach((address,i) => {
          if(address.distance.value === Math.min(...distances)){
            closest = address.address;
          }
        });
        console.log(closest);
      });
    }
  }

