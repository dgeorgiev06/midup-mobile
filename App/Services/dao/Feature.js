import * as turfHelpers from '@turf/helpers';

export default class Feature {
    constructor(type = "Point", id, longitude, latitude, properties) {
        this._id = id
        this._type = type
        this._longitude = longitude
        this._latitude = latitude
        this._properties = properties
    }

    get feature() {
        const geometry = {
            type: this._type,
            coordinates: [this._longitude, this._latitude]
        }

        let feature = turfHelpers.feature(geometry, this._properties);
        feature.id = this._id

        return feature
    }
}