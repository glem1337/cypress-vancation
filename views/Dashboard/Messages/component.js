import PropTypes from 'prop-types';

import ROUTES from 'constants/routes';
import UserFooter from 'views/shared/UserFooter';

import Header from '../Header';

const DashBoardMessagesComponent = () => (
  <>
    <Header activeTabKey={ROUTES.OWNER_DASHBOARD.MESSAGES.KEY} />
    <div id="main-account-wrap-master" className="main-account-wrap--listing">
      Messages
    </div>
    <UserFooter />
  </>
);

DashBoardMessagesComponent.defaultProps = {
  currentUser: null,
};

DashBoardMessagesComponent.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    user: PropTypes.shape({
      lastName: PropTypes.string,
      firstName: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  }),
};

export default DashBoardMessagesComponent;
