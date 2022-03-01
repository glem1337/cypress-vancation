import React from 'react';
import { shallow } from 'enzyme';

import camperPricingData from '../../__mocks__/camperPricingData';

import CamperPricesModal from '../component';

let mockedHookData = {
  campervanMake: 'campervanMake',
  campervanModel: 'campervanModel',
  mainPhotoUrl: 'mainPhotoUrl',
  isInstantBook: true,
  closeModal: jest.fn(),
  pricingData: camperPricingData,
  viewFeesAndProcessing: jest.fn(),
  isCamperPricingAndFeesFetching: false,
};
jest.mock('utils/hooks/useCamperPricesAndFees', () => jest.fn(() => mockedHookData));

describe('CamperPricesModal component tests', () => {
  const props = {
    isVisible: true,
    closeCard: jest.fn(),
  };

  it('matches snapshot', () => {
    const component = shallow(<CamperPricesModal {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when is fetching', () => {
    mockedHookData = {
      ...mockedHookData,
      isCamperPricingAndFeesFetching: true,
    };
    const component = shallow(<CamperPricesModal {...props} />);

    expect(component).toMatchSnapshot();
  });
});
