import { shallow } from 'enzyme';

import { MAX_DESCRIPTION_VISIBLE_SYMBOLS } from 'constants/camperDetails/addons';

import AddonCard from '../container';

describe('AddonCard container tests', () => {
  const props = {
    iconUrl: 'url',
    price: '50',
    name: 'name',
    priceUnit: 'per day',
    description: 'description',
  };

  const container = shallow(<AddonCard {...props} />);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `toggleDescription` instance method', () => {
    instance.toggleDescription();

    expect(container.state().allDescriptionVisible).toBe(true);

    instance.toggleDescription();

    expect(container.state().allDescriptionVisible).toBe(false);
  });

  describe('checks `visibleDescription` instance getter', () => {
    it('should return not truncated description', () => {
      expect(instance.visibleDescription).toEqual(props.description);
    });

    it('should return truncated description', () => {
      container.setProps({
        description:
          'description description description description description description',
      });

      const { description } = container.props();

      const expected = `${description.substring(
        0,
        MAX_DESCRIPTION_VISIBLE_SYMBOLS,
      )}...`;

      expect(instance.visibleDescription).toBe(expected);
    });
  });
});
