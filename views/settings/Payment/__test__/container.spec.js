import { shallow } from 'enzyme';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import PaymentWrapper, { PaymentContainer } from '../container';

describe('Account settings container', () => {
  const wrapper = shallow(<PaymentWrapper />);
  const container = diveTo(wrapper, PaymentContainer);

  it('Account settings container snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
