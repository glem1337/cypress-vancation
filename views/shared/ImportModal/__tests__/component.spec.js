import React from 'react';
import { shallow } from 'enzyme';

import ImportModal from '../component';

describe('ImportModal component tests', () => {
  const props = {
    onClose: jest.fn(),
    handleSubmit: jest.fn(),
    isValid: true,
    isLoading: false,
  };

  const component = shallow(<ImportModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
