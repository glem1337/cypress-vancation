import React from 'react';
import { shallow } from 'enzyme';

import camperPricingData from '../../__mocks__/camperPricingData';

import CamperPricesCard from '../component';

let mockedHookData = {
  campervanMake: 'campervanMake',
  campervanModel: 'campervanModel',
  mainPhotoUrl: 'mainPhotoUrl',
  isInstantBook: true,
  pricingData: camperPricingData,
  viewFeesAndProcessing: jest.fn(),
  isCamperPricingAndFeesFetching: false,
};
jest.mock('utils/hooks/useCamperPricesAndFees', () => jest.fn(() => mockedHookData));

describe('CamperPricesCard component tests', () => {
  const props = {
    isVisible: true,
  };

  it('matches snapshot', () => {
    const component = shallow(<CamperPricesCard {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when is fetching', () => {
    mockedHookData = {
      ...mockedHookData,
      isCamperPricingAndFeesFetching: true,
    };
    const component = shallow(<CamperPricesCard {...props} />);

    expect(component).toMatchSnapshot();
  });
});
