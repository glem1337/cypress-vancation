import moment from 'moment';

import isPresent from 'utils/isPresent';

/**
 * Create dates string.
 */
const constructDatesStringFromSearchParams = (searchParams) => {
  const isLandingPage = isPresent(searchParams.location?.slug);

  const startDate = searchParams.dateRange ? searchParams.dateRange[0] : null;
  const endDate = searchParams.dateRange ? searchParams.dateRange[1] : null;

  if ((!isPresent(endDate) || !isPresent(startDate)) && !isLandingPage) {
    return { id: 'shared.addDates' };
  }

  if ((!isPresent(endDate) || !isPresent(startDate)) && isLandingPage) {
    return { id: 'shared.dates' };
  }

  const startDateMoment = moment(startDate).format('MMM D');
  const endDateMoment = moment(endDate).format('MMM D');

  return `${startDateMoment} - ${endDateMoment}`;
};

export default constructDatesStringFromSearchParams;
