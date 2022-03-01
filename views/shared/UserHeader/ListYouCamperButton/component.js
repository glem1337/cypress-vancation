import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import ROUTES from 'constants/routes';
import GradientButton from 'views/shared/GradientButton';
import { createRouteFromPathname } from 'utils/createRouteHelper';

const ListYouCamperButton = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <Link href={createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH, 'id')}>
      <div className="main-account-header__item mr-0">
        <GradientButton text={{ id: 'shared.listYourCamper' }} />
      </div>
    </Link>
  );
};

ListYouCamperButton.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default ListYouCamperButton;
