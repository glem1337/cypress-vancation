import React from 'react';
import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';

import SearchSectionComponent from '../component';

describe('SearchSectionComponent component tests', () => {
  const props = {
    isStartInputVisible: true,
    isChooseDestinationVisible: true,
    intl,
    onStartInputFocus: jest.fn(),
    destinationsInputRef: {},
  };

  const component = shallow(<SearchSectionComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isChooseDestinationVisible equals false', () => {
    component.setProps({ isChooseDestinationVisible: false });

    expect(component).toMatchSnapshot();
  });
});
