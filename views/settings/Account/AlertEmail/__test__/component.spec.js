import { shallow } from 'enzyme';
import AlertEmailComponent from '../component';

describe('AlertEmail Component', () => {
  const component = shallow(<AlertEmailComponent><div>Foo</div></AlertEmailComponent>);

  it('snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
