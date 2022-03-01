import classNames from 'classnames';
import PropTypes from 'prop-types';

const Rating = ({
 rating, isHigh, isNormal, isMiddle, isLow,
}) => (
  <>
    <div
      className={classNames('profile-user-card__photo-rating-icon', {
        'background-green-300': isHigh,
        'background-yellow-1000': isMiddle,
        'background-red-1000': isLow,
      })}
    >
      <img src="/images/Like - White.svg" alt="" />
    </div>
    <p
      className={classNames('mr-16 text-subheader font-700', {
        'in-green-300': isHigh,
        'in-green-1000': isNormal,
        'in-yellow-1000': isMiddle,
        'in-red-1000': isLow,
      })}
    >
      {rating}
      %
    </p>
  </>
);

Rating.propTypes = {
  isHigh: PropTypes.bool.isRequired,
  isNormal: PropTypes.bool.isRequired,
  isMiddle: PropTypes.bool.isRequired,
  isLow: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Rating;
