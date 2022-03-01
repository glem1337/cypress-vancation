import { shallow } from 'enzyme';

import CheckboxGroupField from '../container';

describe('CheckboxGroupField container', () => {
  const defaultProps = {
    options: [
      { value: 'value1', text: 'text1' },
      { value: 'value2', text: 'text2' },
      { value: 'value3', text: 'text3' },
    ],
    field: {
      onChange: jest.fn(() => jest.fn()),
      name: 'name',
      value: ['value1', 'value2'],
    },
    form: {
      setFieldValue: jest.fn(),
    },
    title: { id: 'fake.title' },
  };

  const wrapper = shallow(<CheckboxGroupField {...defaultProps} />);
  const instance = wrapper.instance();

  it('renders CheckboxGroupField component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('isChecked()', () => {
    expect(instance.isChecked('value1')).toEqual(true);
    expect(instance.isChecked('value2')).toEqual(true);
    expect(instance.isChecked('value3')).toEqual(false);
  });

  describe('handleChange()', () => {
    describe('when value already selected', () => {
      it('removes it from field value', () => {
        instance.handleChange('value1')();

        expect(defaultProps.field.onChange).toHaveBeenCalledWith({
          target: { value: ['value2'], name: 'name' },
        });
      });
    });

    describe('when value does not selected', () => {
      it('adds it from field value', () => {
        instance.handleChange('value4')();

        expect(defaultProps.field.onChange).toHaveBeenCalledWith({
          target: { value: ['value1', 'value2', 'value4'], name: 'name' },
        });
      });
    });
  });
});
