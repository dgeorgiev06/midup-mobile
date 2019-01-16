export default class Invitee {
    constructor(
        userProfileId,
        userLogin,
        addressLongitude,
        addressLatitude,
        type,
        address,
        imageUrl,
        status
    ) {
        this._userProfileId = userProfileId
        this._userLogin = userLogin
        this._addressLongitude = addressLongitude
        this._addressLatitude = addressLatitude
        this._address = address
        this._imageUrl = imageUrl
        this._status = status
        this._type = type
    }

    get type() {
        return this._type
    }

    get status() {
        return this._status
    }

    get userProfileId() {
        return this._userProfileId
    }

    get userLogin() {
        return this._userLogin
    }

    get addressLongitude() {
        return this._addressLongitude
    }

    get addressLatitude() {
        return this._addressLatitude
    }

    get address() {
        return this._address
    }

    get imageUrl() {
        return this._imageUrl
    }
}