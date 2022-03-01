import { shallow } from 'enzyme';

import Documents from '../component';

describe('Documents component tests', () => {
  const props = {
    onRemove: jest.fn(),
    validateFiles: jest.fn(),
    documents: [],
  };

  const component = shallow(<Documents {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
