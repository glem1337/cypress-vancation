import React from 'react';
import { shallow } from 'enzyme';

import CollapsibleText from '../component';

const mockedHookData = {
  collapsed: true,
  setCollapsed: jest.fn(),
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('CollapsibleText component tests', () => {
  const props = {
    children: <p>test</p>,
  };

  const component = shallow(<CollapsibleText {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
