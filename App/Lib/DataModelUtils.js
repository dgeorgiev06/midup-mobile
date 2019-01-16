import { featureCollection, centroid, radius, calculateAngles, sortFeaturesByAngle, bboxFromFeatures } from './FeatureUtils'
import InviteeFeature from '../Services/dao/InviteeFeature'

export function createMapParameters (invitees, maxRadius)  {

    let inviteesFeatureCollection = {}
    let center = null
    let r = maxRadius ? maxRadius : 1
    let bbox = null
    
    if(invitees && invitees.length > 0) {
        inviteesFeatureCollection = featureCollection(invitees, InviteeFeature)

        center = centroid(inviteesFeatureCollection)

        r = radius(inviteesFeatureCollection, maxRadius)

        inviteesFeatureCollection = calculateAngles(inviteesFeatureCollection)

        sortFeaturesByAngle(inviteesFeatureCollection)

        bbox = bboxFromFeatures(inviteesFeatureCollection)
    }

    return {
        bbox: bbox,
        radius: r,
        center: center,
        inviteesFeatureCollection: inviteesFeatureCollection
    }
  }

export function dataToSections(data, sectionSource, values, titleFormatter) {
    if(!data) {
        return null
    }

    const sections = new Map()

    const all = values.length == 1 && values.indexOf('*') == 0

    for(item of data) {
        let title = item[sectionSource]

        if(all || values.indexOf(title) > -1) {
            if(titleFormatter) {
                title = titleFormatter(title);
            }

            let values = sections.get(title)
            if(!values)
                values = []

            values.push(item)
            sections.set(title, values)
        }
    }

    let result = [];
    for(const key of sections.keys()) {
        result.push({'title': key, data: sections.get(key)})
    }

    return result
}