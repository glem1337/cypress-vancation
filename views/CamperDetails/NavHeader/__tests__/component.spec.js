import { shallow } from 'enzyme';

import NavHeader from '../component';

let mockedHookData = {
  isCamperExist: true,
  costPerNight: 344,
  camper: { name: 'Test' },
};
jest.mock('utils/hooks/useCamperPricesAndFees', () => jest.fn(() => mockedHookData));

describe('NavHeader component tests', () => {
  it('matches snapshot', () => {
    const component = shallow(<NavHeader />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper doesn`t exist', () => {
    mockedHookData = {
      ...mockedHookData,
      isCamperExist: false,
    };

    const component = shallow(<NavHeader />);

    expect(component).toMatchSnapshot();
  });
});
