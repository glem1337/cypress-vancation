import { shallow } from 'enzyme';
import Account from '../component';

it('Account setting component matches snapshot', () => {
  const component = shallow(<Account />);

  expect(component).toMatchSnapshot();
});
