import Link from 'next/link';
import PropTypes from 'prop-types';

import { createCampervanRentalRoute } from 'utils/createRouteHelper';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';

const Slide = ({
  slide,
}) => {
  if (isMobileView() || isTabletView()) {
    return (
      <>
        {slide.map(({
          id,
          img,
          locationName,
          locationSlug,
          state,
          stateSlug,
        }) => (
          <Link
            key={id}
            href={
              createCampervanRentalRoute({
                state: stateSlug,
                location: locationSlug,
              })
            }
          >
            <a className="home__favorite-dest-slider-item">
              <div className="home__favorite-dest-slider-img">
                <img src={img} alt="" />
              </div>
              <p className="text-subtitle mb-4">
                {locationName}
              </p>
              <p className="text-caption text-color-gray">
                {state}
              </p>
            </a>
          </Link>
      ))}
      </>
    );
  }

  return (
    <div className="home__favorite-dest-slider-wrap">
      {slide.map(({
          id,
          img,
          locationName,
          locationSlug,
          state,
          stateSlug,
        }) => (
          <Link
            key={id}
            href={
              createCampervanRentalRoute({
                state: stateSlug,
                location: locationSlug,
              })
            }
          >
            <a className="home__favorite-dest-slider-item">
              <div className="home__favorite-dest-slider-img">
                <img src={img} alt="" />
              </div>
              <p className="text-subtitle mb-4">
                {locationName}
              </p>
              <p className="text-caption text-color-gray">
                {state}
              </p>
            </a>
          </Link>
      ))}
    </div>
  );
};

Slide.propTypes = {
  slide: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
    locationSlug: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    stateSlug: PropTypes.string.isRequired,
  })).isRequired,
};

export default Slide;
