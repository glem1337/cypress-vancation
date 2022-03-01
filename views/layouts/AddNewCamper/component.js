import PropTypes from 'prop-types';
import Classnames from 'classnames';

import Sidebar from './Sidebar';
import StickyHelpButton from '../../stubs/shared/buttons/StickyHelpButton';

const AddNewCamperLayoutComponent = ({
  children,
  sidebarItems,
  onSidebarItemClick,
  isDelivery,
  onSidebarClose,
  mobileData,
}) => (
  <div className="main-wrap">
    <Sidebar
      items={sidebarItems}
      onItemClick={onSidebarItemClick}
      onSidebarClose={onSidebarClose}
      mobileData={mobileData}
    />
    <div className={Classnames(
      'main-listing container',
      { 'main-listing-delivery': isDelivery },
    )}
    >
      { children }
    </div>
    <StickyHelpButton className="main-help-btn-fixed--listing" />
  </div>
);

AddNewCamperLayoutComponent.propTypes = {
  children: PropTypes.node.isRequired,
  sidebarItems: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSidebarItemClick: PropTypes.func.isRequired,
  isDelivery: PropTypes.bool.isRequired,
  onSidebarClose: PropTypes.func.isRequired,
  mobileData: PropTypes.shape().isRequired,
};

export default AddNewCamperLayoutComponent;
