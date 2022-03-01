import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Link from 'next/link';

import ROUTES from 'constants/routes';

const MessagesSection = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="main-account-header__item ">
      <Link href={ROUTES.BOOKINGS.PATH}>
        <span className="main-account-header__item-txt">
          <FormattedMessage id="headerHeader.messages" />
        </span>
      </Link>
      <span className="main-account-header__item-counter">
        2
      </span>
    </div>
  );
};

MessagesSection.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default MessagesSection;
