import PropTypes from 'prop-types';

import ROUTES from 'constants/routes';
import UserFooter from 'views/shared/UserFooter';

import Header from '../Header';

const DashboardReservationsComponent = () => (
  <>
    <Header activeTabKey={ROUTES.OWNER_DASHBOARD.RESERVATIONS.KEY} />
    <div id="main-account-wrap-master" className="main-account-wrap--listing">
      Reservations
    </div>
    <UserFooter />
  </>
);

DashboardReservationsComponent.defaultProps = {
  currentUser: null,
};

DashboardReservationsComponent.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    user: PropTypes.shape({
      lastName: PropTypes.string,
      firstName: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  }),
};

export default DashboardReservationsComponent;
