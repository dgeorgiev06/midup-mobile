import Venue from '../Services/dao/Venue'

const transform = (googleLocations) => {

    venues = []

    for(let i in googleLocations) {
        venues.push(getLocation(googleLocations[i], googleLocations[i].place_id))
    }

    return venues
    
}

const transformDetails = (locationDetails) => {
    return getLocation(locationDetails, locationDetails.place_id)
}

const getLocation = (googleLocation, id) => {

    location = new Venue(
        id,
        googleLocation.id,
        googleLocation.place_id,
        googleLocation.geometry.location.lng,
        googleLocation.geometry.location.lat,
        googleLocation.name,
        googleLocation.formatted_phone_number,
        googleLocation.vicinity,
        " ",
        googleLocation.rating,
    )

    return location
}
  
// let's return back our create method as the default.
export default {
  transform,
  transformDetails
}