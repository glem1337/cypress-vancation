import searchDestinationsByQuery from './searchDestinationsByQuery';
import searchDestinationsByCoordinates from './searchDestinationsByCoordinates';
import searchDestination from './searchDestination';
import fetchNearYouDestinations from './fetchNearYouDestinations';
import fetchSearchResultData from './fetchSearchResultData';

export default [
  searchDestinationsByQuery,
  searchDestinationsByCoordinates,
  searchDestination,
  fetchNearYouDestinations,
  fetchSearchResultData,
];
