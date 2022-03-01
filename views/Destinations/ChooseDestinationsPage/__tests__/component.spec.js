import React from 'react';
import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';
import { MAPBOX_FEATURE_TYPE } from 'constants/searchDestinations';

import SearchDestinationsComponent from '../component';

describe('SearchDestinationsComponent component tests', () => {
  const props = {
    onClose: jest.fn(),
    onDestinationsSearch: jest.fn(),
    intl,
    onDestinationSelect: jest.fn(),
    onDestinationsClear: jest.fn(),
    destinations: [
      { id: 1, type: 'loader' },
      { id: 'shared.exploreCampervansNearYour', type: 'shared.exploreCampervansNearYour' },
      { id: 3, type: 'shared.explorePopularDestinations' },
      { id: 4, landingType: true, landingName: 'test', mainPhotoUrl360: 'mainPhotoUrl360' },
      { id: 5, type: MAPBOX_FEATURE_TYPE, placeName: 'test' },
      { id: 6 },
    ],
  };

  const component = shallow(<SearchDestinationsComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
