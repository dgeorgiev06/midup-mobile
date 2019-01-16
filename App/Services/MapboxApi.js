// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'

// our "constructor"
const create = (baseURL = 'https://api.mapbox.com/directions/v5/mapbox/cycling/') => {
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

  this.accessToken = AppConfig.mapboxAccessToken

  const setAccessToken = (accessToken) => this.accessToken = accessToken
  
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
  const getDirections = (coordinates) => {
    let origin = coordinates[1].longitude + ',' + coordinates[1].latitude
    let destination = coordinates[0].longitude + ',' + coordinates[0].latitude
    const path = origin + ';' + destination

    return api.get(path, {access_token: this.accessToken, geometries:'geojson'});
  }
  
  
  return {
    getDirections,
    setAccessToken
  }
}

// let's return back our create method as the default.
export default {
  create
}