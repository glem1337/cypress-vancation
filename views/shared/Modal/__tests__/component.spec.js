import { shallow } from 'enzyme';

import Modal from '../component';

describe('Modal component matches snapshot', () => {
  const defaultProps = {
    children: <div>Content</div>,
    onClose: jest.fn(),
    additionalProps: 'additionalProps',
  };

  it('with default props', () => {
    const wrapper = shallow(<Modal {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
