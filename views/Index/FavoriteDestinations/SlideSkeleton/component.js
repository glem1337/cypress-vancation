import * as R from 'ramda';
import PropTypes from 'prop-types';

const SlideSkeleton = ({
  amountLocationOnSlide,
}) => (
  <div className="home__favorite-dest-slider-wrap">
    {R.range(0, amountLocationOnSlide).map((index) => (
      <div
        key={index}
        className="home__favorite-dest-slider-item home__favorite-dest-slider-item--skeleton"
      >
        <div className="home__favorite-dest-slider-img" />
        <p className="text-subtitle mb-4" />
        <p className="text-caption text-color-gray" />
      </div>
    ))}
  </div>
);

SlideSkeleton.propTypes = {
  amountLocationOnSlide: PropTypes.number.isRequired,
};

export default SlideSkeleton;
