import React from 'react';
import { shallow } from 'enzyme';

import ShareSection from '../component';

let mockedHookData = {
  isDropDownVisible: true,
  toggleDropdownVisibility: jest.fn(),
  sharedEmailData: {
    url: window.location.href,
    subject: 'Subject',
  },
  isUrlCopied: false,
  copyUrlToClipBoard: jest.fn(),
  sharedSocialData: {
    url: window.location.href,
    mainPhoto: 'https://main.photos.com',
  },
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('ShareSection component tests', () => {
  it('matches snapshot', () => {
    const component = shallow(<ShareSection />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isUrlCopied equals true', () => {
    mockedHookData = {
      ...mockedHookData,
      isUrlCopied: true,
    };

    const component = shallow(<ShareSection />).find('.copy-link');

    expect(component).toMatchSnapshot();
  });
});
