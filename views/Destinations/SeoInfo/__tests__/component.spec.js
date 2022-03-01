import React from 'react';
import { shallow } from 'enzyme';

import SeoInfo from '../component';

let mockedHookData = {
  seoInfo: {
    metaDescription: 'metaDescription',
    metaKeywords: 'metaKeywords',
    metaTitle: 'metaTitle',
  },
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('SeoInfo component tests', () => {
  let component = shallow(<SeoInfo />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when `seoInfo` is not defined', () => {
    mockedHookData = {
      seoInfo: null,
    };

    component = shallow(<SeoInfo />);

    expect(component).toMatchSnapshot();
  });
});
