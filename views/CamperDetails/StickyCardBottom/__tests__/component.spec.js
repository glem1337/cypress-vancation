import { shallow } from 'enzyme';

import StickyCardBottom from '../component';

const mockedHookData = {
  isCardVisible: true,
  setPriceCardVisibility: jest.fn(() => jest.fn()),
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

let mockedPricingAndFeesData = {
  isCamperExist: true,
  costPerNight: 223,
};
jest.mock('utils/hooks/useCamperPricesAndFees', () => jest.fn(() => mockedPricingAndFeesData));

describe('StickyCardBottom component tests', () => {
  it('matches snapshot', () => {
    const component = shallow(<StickyCardBottom />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper doesn\'t exist', () => {
    mockedPricingAndFeesData = {
      ...mockedPricingAndFeesData,
      isCamperExist: false,
    };

    const component = shallow(<StickyCardBottom />);

    expect(component).toMatchSnapshot();
  });
});
