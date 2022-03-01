import { shallow } from 'enzyme';

import MetaComponent from '../component';

const mockedHookData = {
  openGraph: {
    url: null,
    title: null,
    type: null,
    image: null,
    siteName: null,
    description: null,
  },
  twitter: {
    card: null,
    image: null,
  },
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('Meta component', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<MetaComponent />);

    expect(wrapper).toMatchSnapshot();
  });
});
