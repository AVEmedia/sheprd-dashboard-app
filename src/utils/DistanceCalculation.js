// Returns the mile radius of vehicle to location
export function getDistanceTo(latitudeFrom, longitudeFrom, latitudeTo, longitudeTo, earthRadius = 6371000){

  let deg2rad = function(angle){
    return angle * 0.017453292519943295;
  };

  // convert from degrees to radians
  let latFrom 	= deg2rad(latitudeFrom);
  let lngFrom 	= deg2rad(longitudeFrom);
  let latTo 		= deg2rad(latitudeTo);
  let lngTo 		= deg2rad(longitudeTo);

  let lngDelta 	= (lngTo - lngFrom);
  let latDelta 	= (latTo - latFrom);

  let angle 		= 2 * Math.asin(Math.sqrt( Math.pow(Math.sin(latDelta/2), 2) + Math.cos(latFrom) + Math.cos(latTo) + Math.pow(Math.sin(lngDelta/2), 2) ));
  let kilometers  = (angle * earthRadius);
  let distance    = Math.round((kilometers * 0.621371));

  return (distance <= 2) ? 1 : 0;
}


export function formatAddress(location,regex,delimiter){
  let address = [];
  for(key in location.location){
    if(location.location[key].length > 0){
      address.push(location.location[key]);
    }
  };
  return address.replace( regex , delimiter );
}