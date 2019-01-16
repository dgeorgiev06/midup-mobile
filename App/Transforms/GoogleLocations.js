const transform = (googleLocations) => {

    /*venues = []

    for(let i in googleLocations) {
        venues.push(getLocation(googleLocations[i]))
    }

    return venues*/

    let locations = {
        "type": "FeatureCollection",
        "features": []
    };
    let id = 1;
   
    for(let i in googleLocations) {
        location = getLocation(googleLocations[i]);
        location.id = id++;
        locations.features.push(location);
    }
    return locations;
    
}

const transformDetails = (locationDetails) => {
    return getLocation(locationDetails)
}

const getLocation = (googleLocation) => {

    /*location = new Venue(
        googleLocation.googleLocation.id,
        googleLocation.place_id,
        googleLocation.geometry.location.lng,
        googleLocation.geometry.location.lat,
        googleLocation.name,
        googleLocation.formatted_phone_number,
        googleLocation.vicinity,
        " ",
        googleLocation.rating,
    )

    return location*/

    location = {}

    if(!googleLocation) {
        return location
    }

    location.googId = googleLocation.id
    location.placeId = googleLocation.place_id
    location.icon = googleLocation.icon
    location.type = "Feature";
    location.geometry = {};
    location.geometry.type = "Point";
    location.geometry.coordinates = [];
    location.geometry.coordinates.push(googleLocation.geometry.location.lng);
    location.geometry.coordinates.push(googleLocation.geometry.location.lat);
    location.properties = {};
    location.properties.name = googleLocation.name;
    location.properties.phoneFormatted = googleLocation.formatted_phone_number ? googleLocation.formatted_phone_number : "";
    location.properties.addressFormatted = googleLocation.vicinity;
    location.properties.hoursFormatted = ""; // to do
    location.properties.rating = googleLocation.rating ? googleLocation.rating : ""
    location.properties.opening_hours = googleLocation.opening_hours && googleLocation.opening_hours.weekday_text ? googleLocation.opening_hours.weekday_text : []

    return location
}
  
// let's return back our create method as the default.
export default {
  transform,
  transformDetails
}