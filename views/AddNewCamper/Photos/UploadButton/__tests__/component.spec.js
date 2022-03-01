import React from 'react';
import { shallow } from 'enzyme';

import UploadButton from '../component';

describe('UploadButton component tests', () => {
  const props = {
    uploadPhotos: jest.fn(),
    disabled: false,
  };

  const component = shallow(<UploadButton {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
