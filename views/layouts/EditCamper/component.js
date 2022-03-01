import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';

import ROUTES from 'constants/routes';

import Header from 'views/Dashboard/Header';
import BtnGradient from 'views/shared/BtnGradient';
import Sidebar from './Sidebar';

const EditCamperLayout = ({
  children,
  hasFooter,
  onSave,
  canSave,
  isLoading,
  sidebarItems,
  onSidebarItemClick,
  onSidebarMobileChange,
  activeItemSlug,
  showGradientButton,
}) => (
  <>
    <Header activeTabKey={ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.KEY} />
    <div className="edit-list-wrap">
      <Sidebar
        items={sidebarItems}
        onItemClick={onSidebarItemClick}
        onSidebarMobileChange={onSidebarMobileChange}
        activeItemSlug={activeItemSlug}
      />
      <div
        className={classNames(
          'edit-list-wrap__inner',
          hasFooter && 'edit-list-wrap__inner--has-footer',
        )}
      >
        {children}
      </div>
      {hasFooter && (
        <div className="main-listing__footer">
          <div className="main-listing__footer-container">
            {showGradientButton && (
              <BtnGradient
                onClick={onSave}
                size="large"
                text={{ id: 'shared.save' }}
                className="ml-auto min-w-140"
                disabled={!canSave}
                isLoading={isLoading}
              />
            )}
            {!showGradientButton && (
              <Button
                size="large"
                className="ml-auto min-w-140"
                onClick={onSave}
                loading={isLoading}
              >
                <FormattedMessage id="shared.save" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  </>
);

EditCamperLayout.defaultProps = {
  hasFooter: false,
  canSave: true,
  isLoading: false,
  showGradientButton: true,
  onSave: undefined,
};

EditCamperLayout.propTypes = {
  sidebarItems: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSidebarItemClick: PropTypes.func.isRequired,
  onSidebarMobileChange: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  children: PropTypes.node.isRequired,
  activeItemSlug: PropTypes.string.isRequired,
  hasFooter: PropTypes.bool,
  canSave: PropTypes.bool,
  isLoading: PropTypes.bool,
  showGradientButton: PropTypes.bool,
};

export default EditCamperLayout;
