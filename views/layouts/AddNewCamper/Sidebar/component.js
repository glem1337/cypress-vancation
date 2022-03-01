import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { APP_PHONE } from 'constants';

const Sidebar = ({ items, onItemClick, onSidebarClose, mobileData }) => (
  <aside className="main-listing-sidebar">
    <div
      className="main-listing-sidebar__close"
      role="button"
      onClick={onSidebarClose}
    >
      <i className="icon icon-cross" />
    </div>
    <div>
      <div className="main-listing-sidebar__title">
        <FormattedMessage id="addNewCamper.NewCamper" />
      </div>
      <div className="d-none d-lg-block">
        {items.map((item, index) => (
          <a
            key={item?.name?.id}
            className={
              classnames(
                'main-listing-sidebar__item',
                { 'main-listing-sidebar__item--active': item?.active },
              )
            }
            onClick={onItemClick(item)}
            role="button"
          >
            <div className="main-listing-sidebar__item-numb">
              {index + 1}
            </div>
            <FormattedMessage {...item.name} />
          </a>
        ))}
      </div>
      <div className="d-flex d-lg-none align-items-center">
        <span className="mr-4 font-600">
          <FormattedMessage
            id="addNewCamper.mobileStepStart"
            values={{ count: mobileData.step }}
          />
        </span>
        <span>
          <FormattedMessage
            id="addNewCamper.mobileStepFinish"
            values={{ count: items.length }}
          />
          {' - '}
          <FormattedMessage {...mobileData.name} />
        </span>
      </div>
    </div>
    <div className="main-listing-sidebar__footer">
      <div className="main-listing-support-icon">
        <i className="icon icon-question-f in-blue-1000 font-20" />
      </div>
      <div>
        <p className="text-caption mb-4">
          <FormattedMessage id="addNewCamper.HelperTitle" />
        </p>
        <a href={`tel:${APP_PHONE}`} className="font-600 in-white">
          {APP_PHONE}
        </a>
      </div>
    </div>
  </aside>
);

Sidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onItemClick: PropTypes.func.isRequired,
  onSidebarClose: PropTypes.func.isRequired,
  mobileData: PropTypes.shape().isRequired,
};

export default Sidebar;
