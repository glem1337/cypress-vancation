import React from 'react';
import { shallow } from 'enzyme';

import InnerHtmlField from '../component';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

describe('InnerHtmlField component tests', () => {
  const props = {
    html: '<p>Test</p>',
  };

  const component = shallow(<InnerHtmlField {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot with WrapperTag', () => {
    component.setProps({ WrapperTag: 'section' });
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when html is not existed', () => {
    component.setProps({ html: null });

    expect(component).toMatchSnapshot();
  });
});
