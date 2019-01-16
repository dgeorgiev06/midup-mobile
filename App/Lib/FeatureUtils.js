
import * as turfHelpers from '@turf/helpers';
import * as turf from 'turf-extent'

export function createPointFeature(longitude, latitude, properties = {}) {
    const geometry = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    return turfHelpers.feature(geometry, properties)
}

export function calculateAngles(collection) {
    const center = centroid(collection)

    const features = collection.features.map((f) => {
        dx = f.geometry.coordinates[1] - center.x
        dy = f.geometry.coordinates[0] - center.y

        return { 
            ...f,
            angle: Math.atan2(dy, dx)
        }
    })

    return {...collection, features}
}

export function bboxFromFeatures(collection) {

    let features = collection.features

    if(collection.features.length > 2) {
        features = [...features, features[0]]
    }

    const polygon = turfHelpers.featureCollection(features);

    return turf.default(polygon)
}

export function radius(collection, max = 20) {
    const center = centroid(collection)
    const features = collection.features
    const result = features.reduce((total, feature) => {
        const distance = getDistance(center.x, center.y, feature.geometry.coordinates[1], feature.geometry.coordinates[0])
        return total + distance
    }, 0)

    const divider = features.length * 1.5

    return Math.min(result / divider, max)
}

export function sortFeaturesByAngle(collection) {

    collection.features.sort((a, b) => {
        if(a.properties.angle > b.properties.angle) {
            return 1
        }
        else {
            return -1
        }

        return 0
    })
}

export function centroid(collection) {
    let centroid = { x: 0, y: 0 }

    for(let i = 0; i < collection.features.length; i++) {
        centroid.x += collection.features[i].geometry.coordinates[1]
        centroid.y += collection.features[i].geometry.coordinates[0]
    }

    centroid.x /= collection.features.length
    centroid.y /= collection.features.length

    return centroid
}

export function featureCollection(array, featureType) {
    const features = array.map((element) => {
        const feature = new featureType(element)

        return feature.feature
    })

    return features ? turfHelpers.featureCollection(features) : undefined
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