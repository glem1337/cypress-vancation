import isPresent from 'utils/isPresent';

/**
 * Create location string.
 */
const constructLocationStringFromSearchParams = (searchParams, constructLandingName = false) => {
  const isLandingPage = isPresent(searchParams.location?.slug);

  if (isLandingPage && !constructLandingName) {
    return '';
  }

  return searchParams.location?.landingName || searchParams.location?.placeName;
};

export default constructLocationStringFromSearchParams;
