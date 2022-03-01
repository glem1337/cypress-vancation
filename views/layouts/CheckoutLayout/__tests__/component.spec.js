import { shallow } from 'enzyme';

import { CHECKOUT_STATUS_KEYS } from 'constants/checkout';

import { camperInquirySelector } from 'state/concepts/booking/selectors';

import CheckoutLayout from '../component';

const checkoutStatus = CHECKOUT_STATUS_KEYS.PERSONAL_INFORMATION;
jest.mock('state/concepts/booking/selectors', () => ({
  camperInquirySelector: jest.fn(),
}));

camperInquirySelector.mockImplementation(() => ({
  booking: {
    checkoutStatus,
  },
}));

describe('CheckoutLayout component tests', () => {
  const props = {
    currentStep: 1,
    price: 375,
    showBackBtn: true,
    btnText: { id: 'shared.continue' },
    onBack: jest.fn(),
    header: <div />,
  };

  const component = shallow(<CheckoutLayout {...props}>Foo</CheckoutLayout>);

  describe('matches snapshot', () => {
    it('default', () => {
      expect(component).toMatchSnapshot();
    });

    it('when showBackBtn is equal false', () => {
      component.setProps({
        showBackBtn: false,
      });

      expect(component).toMatchSnapshot();
    });
  });
});
