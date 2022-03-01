import React from 'react';
import Link from 'next/link';
import { Divider, Button } from 'antd';
import { FormattedMessage } from 'react-intl';

import { createCampervanRentalRoute } from 'utils/createRouteHelper';
import useResultsInfo from 'views/Destinations/SearchResultsInfo/hook';
import useMobileFilterVisibility from 'utils/hooks/useMobileFilterVisibility';

import useSharedValues from '../hooks/useSharedValues';

const MobileControls = () => {
  const { toggleMobileFiltersVisibility } = useMobileFilterVisibility();

  const { campersTotal } = useSharedValues();

  const {
    slug,
    state,
    location,
  } = useResultsInfo();

  return (
    <div className="d-flex d-lg-none align-items-center h-100 flex-1">
      <div className="d-flex align-items-center flex-1">
        <div>
          <Link href={createCampervanRentalRoute({ state: slug })}>
            <a>
              <span className="font-600 in-black">
                {state}
              </span>
            </a>
          </Link>
          {location && ` - ${location}`}
        </div>
        <div className="ml-auto">
          <FormattedMessage id="campervan-rental.campersFound" values={{ count: campersTotal }} />
        </div>
      </div>
      <Divider className="d-lg-none" type="vertical" />
      <Button
        type="link"
        size="large"
        icon={<i className="icon icon-filter in-gray-500" />}
        onClick={toggleMobileFiltersVisibility}
      />
    </div>
  );
};

export default MobileControls;
