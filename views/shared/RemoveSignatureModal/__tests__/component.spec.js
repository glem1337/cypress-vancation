import React from 'react';
import { shallow } from 'enzyme';

import RemoveSignatureComponent from '../component';

describe('RemoveSignatureComponent component tests', () => {
  const props = {
    title: 'Title',
    subTitle: 'Sub Title',
    cancel: jest.fn(),
    remove: jest.fn(),
    isLoading: false,
  };

  const component = shallow(<RemoveSignatureComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
