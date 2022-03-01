import React from 'react';
import { shallow } from 'enzyme';

import Description from '../component';

let mockedHookData = {
  areCampersExist: false,
  description: 'test description',
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('Description component tests', () => {
  let component = shallow(<Description />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when description is not provided', () => {
    mockedHookData = {
      areCampersExist: true,
      description: null,
    };

    component = shallow(<Description />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when campers exist', () => {
    mockedHookData = {
      areCampersExist: true,
      description: 'test description',
    };

    component = shallow(<Description />);

    expect(component).toMatchSnapshot();
  });
});
