import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import ROUTES from 'constants/routes';

const LinksSection = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <Link href={ROUTES.SIGNUP.PATH}>
        <div className="main-account-header__item">
          <span className="mr-4 main-account-header__item-txt">
            <FormattedMessage id="shared.signUp" />
          </span>
        </div>
      </Link>
      <Link href={ROUTES.LOGIN.PATH}>
        <div className="main-account-header__item">
          <span className="mr-4 main-account-header__item-txt">
            <FormattedMessage id="shared.logIn" />
          </span>
        </div>
      </Link>
    </>
  );
};

LinksSection.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default LinksSection;
