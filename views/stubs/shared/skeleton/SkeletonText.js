/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import classNames from 'classnames';

const SkeletonText = ({ className, rows = 2 }) => (
  <ul className={classNames('skeleton__text', className)}>
    {new Array(rows).fill(null).map((_item, i) => (
      <li key={i} style={i === rows - 1 ? { width: '61%' } : null} />
    ))}
  </ul>
);

export default SkeletonText;
