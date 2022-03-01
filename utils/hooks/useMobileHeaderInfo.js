import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import constructDatesStringFromSearchParams from 'utils/destinations/constructDatesStringFromSearchParams';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';

function useMobileHeaderInfo() {
  const intl = useIntl();

  const searchDestinationParams = useSelector(searchDestinationParamsSelector);

  const locationString = searchDestinationParams?.locationIntent?.landingName
    || searchDestinationParams?.locationIntent?.placeName;

  const datesPrepared = constructDatesStringFromSearchParams(searchDestinationParams);
  const datesString = typeof datesPrepared === 'object'
    ? intl.formatMessage(datesPrepared)
    : datesPrepared;

  return {
    locationString,
    datesString,
    areDateExisting: typeof datesPrepared !== 'object',
    isLocationExisting: locationString !== intl.formatMessage({ id: 'shared.location' }),
  };
}

export default useMobileHeaderInfo;
