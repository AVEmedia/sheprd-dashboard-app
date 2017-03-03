import React, {Component} from 'react';
import {getDistance, callDistanceMatrix, getStartingDestination} from '../common/GoogleDistanceMatrixAPI';
import _horizon from '../horizon-container';

class RouteCalculator extends Component{

  constructor(props) {
    super(props);
    this.state = {
      hub: {},
      vehicles: {},
      schedules: {},
      assignments: []

    };
  }

  componentWillMount(){
    this.getVehicles();
    this.getLocations();
    this.getSchedules();
  }

  // Get active vehicles
  getVehicles(){

  }

  // Get all locations
  getLocations(){

  }

  // Get scheduled rides
  getSchedules(){

  }

  // Get the current location for each active vehicle
  getVehicleLocations(){
    let vehicles = this.props.vehicles.value;
    vehicles.forEach(function(){

      let hub = '';
      let locations = this.props.locations.value;
      locations.forEach(function(location){
        if(location.location.title === 'Hub'){
          hub = location.location;
        }
      });

      // Run script to get the vehicle's current lat and lng
      // let vehicleLoc = getCurrentLatLng(vehicle.identification);

      // Check if vehicle coordinates are within a 2 mile radius of the Hub
      let currentLoc = {};
      if(this.getDistanceTo( vehicleLoc.lat, vehicleLoc.lng, hub.lat, hub.lng )){
        currentLoc.lat = hub.lat;
        currentLoc.lng = hub.lng;
      }else{
        currentLoc.lat = vehicleLoc.lat;
        currentLoc.lng = vehicleLoc.lng;
      }
    });
  }



  // Assign schedules to vehicles
  assignSchedules(){
    let vehicles 	= this.state.vehicles;
    let locations 	= this.state.locations;
    let schedules 	= this.state.schedules;
    let assignments = this.state.assignments;

    let count 				= 0;
    let assignments 		= [];
    let assignedSchedules 	= [];

    // Assign a vehicle to every schedule
    schedules.forEach(function(schedule){
      let assignment 					= {};
      assignment.schedule 			= schedule;
      assignment.schedule.vehicleId 	= vehicles[count].id;
      assignment.vehicle 				= vehicles[count];

      assignments.push(assignment);

      count = (count < (vehicles.length - 1)) ? count + 1 : 0;
    });

    vehicles.forEach(function(vehicle){
      let schedules = [];
      assignments.forEach(function(assignment){
        if(assignment.vehicle.id === vehicle.id){
          schedules.push(assignment.schedule);
        }
      });
      assignedSchedules.push({
        vehicle: vehicle,
        schedules: schedules
      });
    });

    //console.log(assignedSchedules);
    this.props.assignments.value = assignedSchedules;
    this.calculateRoutes();
  }

  // Calculate the route
  calculateRoutes(){
    let assignments = this.props.assignments.value;
  }





  // Render a button for triggering the route calculation
  render(){
    return (
      <form>
        <button type="submit">Calculate Route</button>
      </form>
    );
  }
}

module.exports = RouteCalculator;