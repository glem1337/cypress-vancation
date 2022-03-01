import {
  SET_PAGES,
  SET_CURRENT_LOCATION,
  SET_CURRENT_COORDINATES,
  SET_OPEN_GRAPH_DATA,
} from './type';

export const setPages = ({ currentPage, prevPage, isServer }) => ({
  type: SET_PAGES,
  isServer: isServer || false,
  currentPage,
  prevPage,
});

export const setCurrentCoordinates = ({ longitude, latitude }) => ({
  type: SET_CURRENT_COORDINATES,
  longitude,
  latitude,
});

export const setCurrentLocation = (location) => ({
  type: SET_CURRENT_LOCATION,
  location,
});

export const setOpenGraphData = (data) => ({
  type: SET_OPEN_GRAPH_DATA,
  data,
});
