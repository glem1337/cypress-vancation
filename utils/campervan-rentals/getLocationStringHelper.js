import isPresent from 'utils/isPresent';

const getLocationStringHelper = ({ state, location }) => {
  if (isPresent(state) && isPresent(location)) {
    return `${state} - ${location}`;
  }

  return state;
};

export default getLocationStringHelper;
