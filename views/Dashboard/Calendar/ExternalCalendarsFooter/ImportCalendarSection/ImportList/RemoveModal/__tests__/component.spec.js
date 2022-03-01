import { shallow } from 'enzyme';

import RemoveModal from '../component';

describe('RemoveModal component tests', () => {
  const props = {
    onClose: jest.fn(),
    handleSubmit: jest.fn(),
    isLoading: false,
  };

  const component = shallow(<RemoveModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
