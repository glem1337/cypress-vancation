import PropTypes from 'prop-types';

import { DASHBOARD_CAMPER_MASTER_VIEW_ITEM } from 'constants/dashboard';
import FormattedOrRawMessage from 'views/shared/FormattedOrRawMessage';

const Item = ({
 id, img, label, showArrow, handlerClick,
}) => (
  <li>
    <div
      onClick={handlerClick}
      className="d-flex align-items-center"
      role="button"
    >
      {id === DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id ? (
        <>
          <div className="main-dropdown__item-pic-listing">
            <i className="icon icon-file-list in-black" />
          </div>
          <span className="font-600">
            <FormattedOrRawMessage message={label} />
          </span>
        </>
      ) : (
        <>
          <div
            className="main-dropdown__item-pic-listing"
            style={{ backgroundImage: `url("${img}")` }}
          />
          <span className="text-clamp">
            <FormattedOrRawMessage message={label} />
          </span>
        </>
      )}
      {showArrow && (
        <div className="master-view__menu-arrow">
          <i className="icon icon-down" />
        </div>
      )}
    </div>
  </li>
);

Item.defaultProps = {
  handlerClick: undefined,
  showArrow: false,
  img: undefined,
};

Item.propTypes = {
  img: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  showArrow: PropTypes.bool,
  handlerClick: PropTypes.func,
};

export default Item;
