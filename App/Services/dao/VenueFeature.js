import Feature from './Feature'

export default class VenueFeature extends Feature {
    constructor(venue) {
        super("Point", venue.placeId, venue.longitude, venue.latitude, {
            name: venue.name, 
            phoneFormatted: venue.phoneNumber,
            addressFormatted: venue.address,
            hoursFormatted: venue.hours,
            rating: venue.rating,
            placeId: venue.placeId,
        })

        this._venue = venue
    }

    set venue(venue) {
        this._venue = venue
    }

    get venue() {
        return this._venue
    }
}