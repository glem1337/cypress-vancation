import PropTypes from 'prop-types';

import ROUTES from 'constants/routes';
import UserFooter from 'views/shared/UserFooter';

import Header from '../Header';

const DashboardReportingComponent = () => (
  <>
    <Header activeTabKey={ROUTES.OWNER_DASHBOARD.REPORTING.KEY} />
    <div id="main-account-wrap-master" className="main-account-wrap--listing">
      Reporting
    </div>
    <UserFooter />
  </>
);

DashboardReportingComponent.defaultProps = {
  currentUser: null,
};

DashboardReportingComponent.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    user: PropTypes.shape({
      lastName: PropTypes.string,
      firstName: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  }),
};

export default DashboardReportingComponent;
