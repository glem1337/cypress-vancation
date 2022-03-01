import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

import FormattedOrRawMessage from 'views/shared/FormattedOrRawMessage';

const Rules = ({
  visibleItems,
  totalItems,
  onToggle,
  allItemsVisible,
  defaultVisibleCount,
}) => (
  <>
    {visibleItems.map((rule) => (
      <div
        key={rule?.id || rule?.title?.id}
        className={classnames('d-flex align-items-center mb-16', {
          'van-details__unavailable-item': !rule.available,
        })}
      >
        {rule.icon && (
          <img
            className="mr-12 edit-list-switch-card__icon"
            src={rule.icon}
            alt=""
          />
        )}
        <p className="in-black">
          <FormattedOrRawMessage message={rule.title} />
        </p>
      </div>
    ))}
    {totalItems > defaultVisibleCount && (
      <a
        onClick={onToggle}
        className="main-link in-blue-1000 font-600"
        role="button"
      >
        <FormattedMessage
          id={allItemsVisible ? 'shared.hideCount' : 'shared.showAllCount'}
          values={{
            count: totalItems - defaultVisibleCount,
          }}
        />
      </a>
    )}
  </>
);

Rules.propTypes = {
  onToggle: PropTypes.func.isRequired,
  allItemsVisible: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
  defaultVisibleCount: PropTypes.number.isRequired,
  visibleItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Rules;
