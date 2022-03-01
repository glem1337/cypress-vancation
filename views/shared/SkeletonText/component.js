import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import * as R from 'ramda';

const SkeletonText = ({ rows }) => (
  <ul className="skeleton__text">
    {R.range(0, rows).map((_item, i) => (
      <li key={uuid()} style={i === rows - 1 ? { width: '61%' } : null} />
    ))}
  </ul>
);

SkeletonText.defaultProps = {
  rows: 2,
};

SkeletonText.propTypes = {
  rows: PropTypes.number,
};

export default SkeletonText;
