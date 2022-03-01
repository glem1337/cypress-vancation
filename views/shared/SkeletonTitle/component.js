import PropTypes from 'prop-types';
import classNames from 'classnames';

const SkeletonTitle = ({ className, width }) => (
  <div
    className={classNames('skeleton__title', className)}
    style={{ width: `${width}%` }}
  />
);

SkeletonTitle.defaultProps = {
  className: '',
  width: 100,
};

SkeletonTitle.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
};

export default SkeletonTitle;
