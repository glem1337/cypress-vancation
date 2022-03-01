import { shallow } from 'enzyme';

import Footer from '../component';

describe('CheckoutLayout layout Footer component tests', () => {
  const props = {
    showBackBtn: true,
    btnText: { id: 'shared.continue' },
    price: 375,
    onBack: jest.fn(),
  };

  const component = shallow(<Footer {...props} />);

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
