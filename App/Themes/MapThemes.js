import StoreLocatorKit from '../Components/mapbox';

import blueUnselectedIceCream from '../Images/push-pin-unselected.png';
import blueSelectedIceCream from '../Images/push-pin-selected.png';
import iceCreamIcon from '../Images/cheers.png';

export const blueTheme = new StoreLocatorKit.Theme({
  icon: blueUnselectedIceCream,
  activeIcon: blueSelectedIceCream,
  styleURL: 'mapbox://styles/mapbox/cj7bwwv3caf7l2spgukxm8bwv',
  primaryColor: '#45AAE9',
  primaryDarkColor: '#268DBA',
  directionsLineColor: '#6ECAF1',
  cardIcon: iceCreamIcon,
  cardTextColor: '#1082B2',
  accentColor: '#9FCCE0',
});