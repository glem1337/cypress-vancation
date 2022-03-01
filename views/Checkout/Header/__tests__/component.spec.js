import { shallow } from 'enzyme';

import { CHECKOUT_STEPS } from 'constants/checkout';

import Header from 'views/Checkout/Header/component';

const mockedHookData = CHECKOUT_STEPS;
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('CheckoutLayout layout Header component tests', () => {
  const props = {
    currentStep: 1,
  };

  const component = shallow(<Header {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
