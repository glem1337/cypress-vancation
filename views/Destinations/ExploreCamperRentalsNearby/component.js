import { Divider } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import isPresent from 'utils/isPresent';
import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

import useContainer from './hook';

const ExploreCamperRentalsNearby = () => {
  const { isSearchResultsPage } = useDestinationPageStats();

  const {
    destinations,
    constructDestinationLink,
    campers,
  } = useContainer();

  if (!isSearchResultsPage || campers.length !== 0) {
    return null;
  }

  return (
    <div
      data-container-for="Explore camper rentals nearby"
      style={{ marginTop: -40 }}
    >
      {isPresent(destinations) && (
        <div className="container-fluid background-white pt-24 pt-md-40">
          <Divider className="mt-0 mb-24 mb-md-40" />
          <h2 className="text-headline mb-24 mb-md-40">
            <FormattedMessage id="shared.exploreCamperRentalsNearby" />
          </h2>
          <ul className="search-page__column-list">
            {destinations.map(item => {
              const link = constructDestinationLink(item);

              return (
                <Link
                  key={item.id}
                  href={link}
                >
                  <a
                    target="_blank"
                    rel="noreferrer"
                  >
                    <li>
                      {item.landingName}
                    </li>
                  </a>
                </Link>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExploreCamperRentalsNearby;
