import React from 'react';
import { shallow } from 'enzyme';

import ExportModal from '../component';

describe('ExportModal component tests', () => {
  const props = {
    url: 'test url',
    onClose: jest.fn(),
    onCopy: jest.fn(),
  };

  const component = shallow(<ExportModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
