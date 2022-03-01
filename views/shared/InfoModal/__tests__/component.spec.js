import React from 'react';
import { shallow } from 'enzyme';

import InfoModal from '../component';

describe('InfoModal component tests', () => {
  const props = {
    title: 'test title',
    subTitle: 'test subTitle',
    hideModal: jest.fn(),
    iconData: { color: 'test color', view: 'test view' },
  };

  const component = shallow(<InfoModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
