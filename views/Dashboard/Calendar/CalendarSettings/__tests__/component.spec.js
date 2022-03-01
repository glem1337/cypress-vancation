import React from 'react';
import { shallow } from 'enzyme';

import CalendarSettingsComponent from '../component';

describe('CalendarSettingsComponent component tests', () => {
  const props = {
    camperId: 'camperId',
  };

  const component = shallow(<CalendarSettingsComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
