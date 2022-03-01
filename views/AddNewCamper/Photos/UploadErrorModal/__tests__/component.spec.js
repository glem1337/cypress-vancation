import React from 'react';
import { shallow } from 'enzyme';

import UploadErrorModal from '../component';

describe('UploadErrorModal component tests', () => {
  const props = {
    hideModal: jest.fn(),
  };

  const component = shallow(<UploadErrorModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
