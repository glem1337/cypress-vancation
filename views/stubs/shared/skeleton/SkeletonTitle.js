/* eslint-disable react/prop-types */
import classNames from 'classnames';

const SkeletonTitle = ({ className, width = 100 }) => (
  <div
    className={classNames('skeleton__title', className)}
    style={{ width: `${width}%` }}
  />
);

export default SkeletonTitle;
