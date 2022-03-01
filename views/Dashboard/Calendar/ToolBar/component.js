import PropTypes from 'prop-types';
import { Button, Dropdown, Menu } from 'antd';
import { Navigate } from 'react-big-calendar';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

const CustomToolbarComponent = ({
  navigate,
  toolbarData,
  toggleSettings,
  toggleFooter,
}) => (
  <div className="calendar-listing__head dashboard-calendar__header">
    <div className="d-flex align-items-center">
      <Button
        type="secondary"
        shape="circle"
        size="small"
        onClick={navigate(Navigate.PREVIOUS)}
        className={classnames({
          'dashboard-calendar__control--disabled': !toolbarData.canPrev,
        })}
      >
        <i className="icon icon-left font-14" />
      </Button>
      <div className="text-subheader font-700 ml-16 mr-16 dashboard-calendar__select-none">
        <span>{toolbarData.month}</span>
        <span className="text-color-gray font-400 ml-8">{toolbarData.year}</span>
      </div>
      <Button
        type="secondary"
        shape="circle"
        size="small"
        onClick={navigate(Navigate.NEXT)}
        className={classnames({
          'dashboard-calendar__control--disabled': !toolbarData.canNext,
        })}
      >
        <i className="icon icon-right font-14" />
      </Button>
    </div>
    <div className="calendar-listing__head-pricing dashboard-calendar__select-none">
      <Dropdown
        overlay={(
          <Menu>
            <Menu.Item key="calendar-listing-settings">
              <a href="#" onClick={toggleSettings}>
                <FormattedMessage id="shared.defaultSettings" />
              </a>
            </Menu.Item>
            <Menu.Item key="calendar-listing-footer">
              <a href="#" onClick={toggleFooter}>
                <FormattedMessage id="calendar.footer.title" />
              </a>
            </Menu.Item>
          </Menu>
        )}
        trigger={['click']}
        placement="bottomRight"
      >
        <Button
          type="settings"
          className="d-lg-none"
          icon={<i className="icon icon-settings" />}
        />
      </Dropdown>
      <a
        href="#"
        className="d-none d-lg-block font-600"
        onClick={toggleSettings}
      >
        <FormattedMessage id="shared.defaultSettings" />
      </a>
    </div>
  </div>
);

CustomToolbarComponent.propTypes = {
  toolbarData: PropTypes.shape().isRequired,
  navigate: PropTypes.func.isRequired,
  toggleSettings: PropTypes.func.isRequired,
  toggleFooter: PropTypes.func.isRequired,
};

export default CustomToolbarComponent;
