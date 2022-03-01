import React from 'react';
import { shallow } from 'enzyme';

import GlampersOnly from '../component';

const mockedHookData = {
  renderGlamperOnlyWidget: jest.fn(() => 'renderGlamperOnlyWidget'),
};
jest.mock('../../hooks/useGlamperOnly', () => jest.fn(() => mockedHookData));

describe('GlampersOnly component tests', () => {
  const component = shallow(<GlampersOnly />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
