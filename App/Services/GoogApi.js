// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://maps.googleapis.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })
  
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  //Specify googles API
  const getVenues = (centerCoordinate, radius = 1) => {
    let lat = centerCoordinate[0];
    let lng = centerCoordinate[1];
    let params = {
        location: lat + "," + lng,
        radius: radius,
        types: "restaurant",
        name: "bar",
        key: ""
    }
    console.tron.log(params);
    return api.get('maps/api/place/nearbysearch/json', params);
  }

  //Specify googles API
  const getVenue = (id) => {
    
    let params = {
        placeid: id,
        key: "AIzaSyAykwjnB8Z2R1ElVJ1TescPUJeBaDDi8gk"
    }
    console.tron.log(params);
    return api.get('maps/api/place/details/json', params);
  }
  
  
  return {
    getVenues,
    getVenue
  }
}

// let's return back our create method as the default.
export default {
  create
}
