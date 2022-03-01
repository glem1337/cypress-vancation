import { shallow } from 'enzyme';

import WaterForm from '../component';

describe('WaterForm component tests', () => {
  const props = {
    isSubmitting: true,
    formatMessage: jest.fn(() => 'some phrase'),
  };

  const component = shallow(<WaterForm {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
