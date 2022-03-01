import React from 'react';
import { shallow } from 'enzyme';

import DateCellWrapperComponent from '../component';

describe('DateCellWrapperComponent component tests', () => {
  const props = {
    children: <div />,
    cellData: {
      isToday: false,
      isActual: true,
      isWeekend: true,
      day: 12,
    },
    isSelected: true,
    dayPrice: '$123',
  };

  const component = shallow(<DateCellWrapperComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
