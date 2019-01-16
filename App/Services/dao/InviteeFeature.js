import Feature from './Feature'

export default class InviteeFeature extends Feature {
    constructor(profile) {
        super("Point", profile.userProfileId, profile.addressLongitude, profile.addressLatitude, {
            iconId: profile.userLogin, 
            type: profile.type ? profile.type : 'member',
            id: profile.userProfileId
        })

        this._profile = profile
    }

    get profile() {
        return this._profile
    }

    set profile(profile) {
        this._profile = profile
    }
}