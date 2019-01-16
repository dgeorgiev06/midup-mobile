export default class Venue {
    constructor(
        id,
        googleId,
        placeId,
        longitude,
        latitude,
        name,
        phoneNumber,
        address,
        rating,
        hours,
    ) 
    {
        this._id = id
        this._googleId = googleId
        this._placeId = placeId
        this._longitude = longitude
        this._latitude = latitude
        this._name = name   
        this._phoneNumber = phoneNumber
        this._address = address
        this._rating = rating
        this._hours = hours
    }

    get id() {
        return this._id
    }

    get googleId() {
        return this._googleId
    }

    get placeId() {
        return this._placeId
    }

    get longitude() {
        return this._longitude
    }

    get latitude() {
        return this._latitude
    }

    get name() {
        return this._name
    }

    get phoneNumber() {
        return this._phoneNumber
    }

    get address() {
        return this._address
    }

    get rating() {
        return this._rating
    }

    get hours() {
        return this._hours
    }
}