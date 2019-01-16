
import * as turfHelpers from '@turf/helpers';

export function calculateAngles(center, points) {
    const length = points.length
    for(let i = 0; i < length; i++) {
        let p = points[i]
        dx = p.x - center.x
        dy = p.y - center.y
        p.angle = Math.atan2(dy, dx)
    }
}

export function sortPointsByAngle(points) {
    points.sort((a, b) => {
        if(a.angle > b.angle) {
            return 1
        }
        else {
            return -1
        }

        return 0
    })
}

export function centroid(points) {
    let centroid = {x: 0, y: 0}
    for(let i = 0; i < points.length; i++) {
        centroid.x += points[i].x
        centroid.y += points[i].y
    }
    centroid.x /= points.length
    centroid.y /= points.length

    return centroid
}

export function getDistance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

export function createFeature(profile, latitude, longitude, type = 'member') {
    let geometry = {
        type: "Point",
        coordinates: [longitude, latitude]
    }
    let properties = {iconId : profile.userLogin, type: type, id: profile.userProfileId}

    return turfHelpers.feature(geometry, properties);
}