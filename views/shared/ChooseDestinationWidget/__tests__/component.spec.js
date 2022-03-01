import React from 'react';
import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';
import { MAPBOX_FEATURE_TYPE, CHOOSE_DESTINATION_WIDGET_SIZE } from 'constants/searchDestinations';

import ChooseDestinationWidgetComponent from '../component';

describe('ChooseDestinationWidgetComponent component tests', () => {
  const props = {
    intl,
    destinations: [
      { id: 1, type: 'loader' },
      { id: 'shared.exploreCampervansNearYour', type: 'shared.exploreCampervansNearYour' },
      { id: 3, type: 'shared.explorePopularDestinations' },
      { id: 4, landingType: true, landingName: 'test', mainPhotoUrl360: 'mainPhotoUrl360' },
      { id: 5, type: MAPBOX_FEATURE_TYPE, placeName: 'test' },
      { id: 6 },
    ],
    listHeight: 100,
    onDestinationsChange: jest.fn(),
    onDestinationsSearch: jest.fn(),
    onRangeFocus: jest.fn(),
    isRangePickerVisible: true,
    dateRange: null,
    onDateRangeChanged: jest.fn(),
    isPairMonthVisible: true,
    rangeInputValue: 'test',
    clearDateRange: jest.fn(),
    size: CHOOSE_DESTINATION_WIDGET_SIZE.LARGE,
    destinationValue: 'test',
    clearDestinations: jest.fn(),
    chooseDestinationRageRef: {},
    destinationsInputRef: {},
    isMobile: true,
    onMobileSelectFocus: jest.fn(),
    formatShortWeekday: jest.fn(),
    tileContent: jest.fn(),
    onRangeInputChange: jest.fn(),
    tileDisabled: jest.fn(),
    searchDestinations: jest.fn(),
    chooseRangeRef: {},
    chooseDestinationRef: {},
    onDestinationsFocus: jest.fn(),
  };

  let component = null;

  beforeEach(() => {
    component = shallow(<ChooseDestinationWidgetComponent {...props} />);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isMobile equals false', () => {
    component.setProps({ isMobile: false });

    expect(component).toMatchSnapshot();
  });

  it('select matches snapshot', () => {
    component.setProps({ isMobile: false });

    const select = component.find('ForwardRef(InternalSelect)').first().renderProp('getPopupContainer')();

    expect(select).toMatchSnapshot();
  });
});
