import React from 'react';
import { shallow } from 'enzyme';

import FooterLinksBlock from '../component';

describe('FooterLinksBlock component tests', () => {
  const props = {
    title: 'Test title',
    linkArray: [
      { id: 1, link: '/link1', txt: 'Text 1' },
      { id: 2, link: '/link2', txt: 'Text 2' },
      {
        id: 3,
        link: '/link3',
        txt: 'Text 3',
        rel: 'noreferrer',
        target: '_blank',
      },
    ],
  };

  const component = shallow(<FooterLinksBlock {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
