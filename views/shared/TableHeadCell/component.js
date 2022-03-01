import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

const TableHeadCell = ({
  text,
  sortKey,
  sortParams,
  onSort,
  className,
}) => {
  const isCurrent = sortKey === sortParams.sortKey;
  const direction = isCurrent ? sortParams.direction : 'asc';

  return sortKey ? (
    <th className={className}>
      <button type="button" onClick={onSort(sortKey)}>
        <span className="va-middle">
          <FormattedMessage {...text} />
        </span>
        <i
          className={classNames('main-table__sorter-icon icon', {
            'icon-arrow-down-long': direction === 'asc',
            'icon-arrow-up-long': direction === 'desc',
            'in-blue-gray-600': isCurrent,
          })}
        />
      </button>
    </th>
  ) : (
    <th className={className}>
      <button type="button">
        <span className="va-middle">
          <FormattedMessage {...text} />
        </span>
      </button>
    </th>
  );
};

TableHeadCell.defaultProps = {
  sortKey: null,
  className: '',
};

TableHeadCell.propTypes = {
  text: PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape(),
  }).isRequired,
  sortKey: PropTypes.string,
  sortParams: PropTypes.shape({
    sortKey: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
  }).isRequired,
  onSort: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default TableHeadCell;
