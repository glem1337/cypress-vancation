import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import * as R from 'ramda';

import { camperSelector } from 'state/concepts/camper/selectors';
import { RATING_BOUNDARIES } from 'constants/camperDetails/owner';

function useContainer() {
  const router = useRouter();

  const camper = useSelector(state => camperSelector(
    state,
    router.query.camper_id,
  ));

  // Miles
  const milesLimited = R.path(['tripFee', 'tripFeeMileage', 'limit'], camper) === true;
  const milesCount = milesLimited
    ? R.path(['tripFee', 'tripFeeMileage', 'available'], camper)
    : null;

  // Delivery
  const deliveryDistance = R.path(['deliveryInformation', 'distance'], camper);

  // Rating color
  const rating = camper?.raiting;

  const ratingColors = R.cond([
    [
      value => value >= RATING_BOUNDARIES.HIGH,
      R.always({
        text: 'in-green-1000',
        background: 'background-green-300',
      }),
    ],
    [
      value => value >= RATING_BOUNDARIES.NORMAL.START && value <= RATING_BOUNDARIES.NORMAL.END,
      R.always({
        text: 'in-green-300',
        background: 'background-green-300',
      }),
    ],
    [
      value => value >= RATING_BOUNDARIES.MIDDLE.START && value <= RATING_BOUNDARIES.MIDDLE.END,
      R.always({
        text: 'in-yellow-1000',
        background: 'background-yellow-1000',
      }),
    ],
    [
      R.T,
      R.always({
        text: 'in-red-1000',
        background: 'background-red-1000',
      }),
    ],
  ])(rating);

  /**
   * Detect Off grid capable system.
   */
  const detectOffGridCapableSystem = () => {
    const amenities = R.defaultTo([], camper?.amenities);

    const CONFIGURATION_AMENITY_TITLE = 'Power System';
    const CONFIGURATION_AMENITY_OPTION_TITLE = 'Off Grid Capable System';

    for (let i = 0; i < amenities.length; i += 1) {
      const amenity = amenities[i];

      const configurationAmenityTitle = R.path(['configurationAmenity', 'title'], amenity);

      if (configurationAmenityTitle === CONFIGURATION_AMENITY_TITLE) {
        const options = R.pathOr([], ['amenityOptions'], amenity);

        for (let j = 0; j < options.length; j += 1) {
          const option = options[j];

          const title = R.path(['configurationAmenityOption', 'title'], option);

          if (title === CONFIGURATION_AMENITY_OPTION_TITLE) {
            return true;
          }
        }
      }
    }

    return false;
  };

  return {
    camper,
    milesCount,
    milesLimited,
    deliveryDistance,
    ratingColors,
    isOffGridCapableExist: detectOffGridCapableSystem(),
  };
}

export default useContainer;
