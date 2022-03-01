import React from 'react';
import { shallow } from 'enzyme';
import ModalRoot from '../component';

jest.mock('../modalComponents', () => ({ MY_MODAL: jest.fn() }));

describe('ModalRoot component', () => {
  const defaultProps = {
    modalType: 'MY_MODAL',
    modalProps: { customProp: 'customProp' },
    onClose: jest.fn(),
  };

  it('renders ModalRoot when modalType is present', () => {
    const component = shallow(<ModalRoot {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });

  it('return null unless modalType present', () => {
    const props = {
      ...defaultProps,
      modalType: null,
    };

    const component = shallow(<ModalRoot {...props} />);

    expect(component).toMatchSnapshot();
  });
});
