import React from 'react';

import { shallow } from 'enzyme';
import Notification from '../component';

describe('Notification component matches snapshot', () => {
  let props = {
    onClose: jest.fn(),
    messageObject: { id: 'some.value' },
    kind: 'success',
    isCloseable: true,
  };

  it('with "success" kind', () => {
    const component = shallow(<Notification {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('with "error" kind', () => {
    props = {
      ...props,
      kind: 'error',
    };
    const component = shallow(<Notification {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('when isCloseable is false', () => {
    props = {
      ...props,
      isCloseable: false,
    };
    const component = shallow(<Notification {...props} />);
    expect(component).toMatchSnapshot();
  });
});
