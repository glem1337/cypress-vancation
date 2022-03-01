import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ActionButton from '../ActionButton';

const Pagination = ({
  onChange,
  pageCount,
  currentPage,
}) => (
  pageCount > 1 ? (
    <ul className="main-pagination">
      <li>
        <a
          className="main-pagination__item"
          onClick={() => onChange({ selected: 0 })}
          role="button"
        >
          <FormattedMessage id="pagination.first" />
        </a>
      </li>
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={3}
        onPageChange={onChange}
        forcePage={currentPage - 1}
        containerClassName="main-pagination"
        activeLinkClassName="main-pagination__item--active"
        pageLinkClassName="main-pagination__item"
        previousLabel={(
          <ActionButton
            icon="icon-arrow-left"
            secondary
          />
        )}
        nextLabel={(
          <ActionButton
            icon="icon-arrow-right"
            secondary
          />
        )}
      />
      <li>
        <a
          className="main-pagination__item"
          onClick={() => onChange({ selected: pageCount - 1 })}
          role="button"
        >
          <FormattedMessage id="pagination.last" />
        </a>
      </li>
    </ul>
  ) : null
);

Pagination.propTypes = {
  onChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
