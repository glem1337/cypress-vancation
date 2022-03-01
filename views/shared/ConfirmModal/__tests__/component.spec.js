import { shallow } from 'enzyme';

import ConfirmModal from '../component';

describe('ConfirmModal component matches snapshot', () => {
  const defaultProps = {
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    title: { id: 'fake.title' },
    bodyText: [{ id: 'fake.bodyText' }, { id: 'fake.text' }],
    submitText: { id: 'fake.submitText' },
    dismissText: { id: 'fake.dismissText' },
    isLoading: false,
  };

  it('with default props', () => {
    const wrapper = shallow(<ConfirmModal {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
