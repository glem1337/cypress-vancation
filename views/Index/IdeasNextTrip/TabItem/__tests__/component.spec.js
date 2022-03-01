import { shallow } from 'enzyme';
import * as R from 'ramda';

import { NEXT_TRIP_DEFAULT_SHOW_ITEMS } from 'constants/home';
import TabItem from '../component';

describe('TabItem component', () => {
  const props = {
    items: [{
      id: 'test.id',
      title: 'test.title',
      subtitle: 'test.subtitle',
      link: 'test.link',
    }],
  };

  const wrapper = shallow(<TabItem {...props} />);

  it('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('item does not have subtitle', () => {
    wrapper.setProps({
      items: [{
        id: 'test.id',
        title: 'test.title',
        link: 'test.link',
      }],
    });

    const subtitle = wrapper.find('.text-color-gray');

    expect(subtitle.isEmptyRender()).toEqual(true);
  });

  it('item does not have subtitle', () => {
    const item = {
      id: 'test.id',
      title: 'test.title',
      link: 'test.link',
    };

    wrapper.setProps({
      items: R.range(0, (NEXT_TRIP_DEFAULT_SHOW_ITEMS + 1)).map(() => item),
    });

    const subtitle = wrapper.find('.home-ideas-next-trip__extra-item');

    expect(subtitle.isEmptyRender()).not.toEqual(true);
  });
});
