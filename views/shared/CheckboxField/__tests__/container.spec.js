import { shallow } from 'enzyme';

import CheckboxField from '../container';

describe('CheckboxField container tests', () => {
  const props = {
    field: {
      name: 'name',
      value: false,
    },
    form: {
      setFieldValue: jest.fn(),
    },
  };

  const wrapper = shallow(<CheckboxField {...props} />);
  const instance = wrapper.instance();

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('checks `handleChange` instance method', () => {
    const event = {
      target: {
        value: true,
      },
    };

    instance.handleChange(event);

    expect(props.form.setFieldValue).toHaveBeenCalledTimes(1);
    expect(props.form.setFieldValue).toHaveBeenCalledWith(
      props.field.name,
      event.target.value,
    );
  });
});
