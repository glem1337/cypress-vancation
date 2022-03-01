import { shallow } from 'enzyme';
import intl from 'utils/testHelpers/fakeIntl';
import { Select } from 'antd';
import SelectFieldComponent from '../component';

describe('SelectField component matches snapshot', () => {
  let component;
  const arrayItems = ['test_1', 'test_2'];
  const fieldName = 'fieldName';
  const defaultProps = {
    field: { value: undefined, name: fieldName },
    form: { touched: {}, errors: {} },
    placeholder: { id: 'fake.placeholder' },
    passThrough: 'prop',
    intl,
    value: '',
    defaultHelp: null,
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    items: arrayItems.map(elem => (
      <Select.Option value={elem} label={elem} key={elem}>
        {elem}
      </Select.Option>
    )),
  };

  beforeEach(() => {
    component = shallow(<SelectFieldComponent {...defaultProps} />);
  });

  it('with default props', () => {
    expect(component).toMatchSnapshot();
  });

  it('with `id`', () => {
    component.setProps({ id: 'test-id' });

    expect(component).toMatchSnapshot();
  });

  it('with `disabled`', () => {
    component.setProps({ disabled: true });

    expect(component).toMatchSnapshot();
  });

  it('with choose item', () => {
    component.setProps({ field: { ...defaultProps.field, value: 'item_1' } });

    expect(component).toMatchSnapshot();
  });

  it('with `label`', () => {
    component.setProps({ label: { id: 'test.fieldLabel' } });

    expect(component).toMatchSnapshot();
  });

  it('when field is touched and has error', () => {
    const form = {
      touched: {
        [fieldName]: true,
      },
      errors: {
        [fieldName]: { id: 'test.error' },
      },
    };

    component.setProps({ form });

    expect(component).toMatchSnapshot();
  });

  it('when field is touched but has no error', () => {
    const form = {
      touched: {
        [fieldName]: true,
      },
      errors: {},
    };

    component.setProps({ form });

    expect(component).toMatchSnapshot();
  });

  it('when field has error but untouched', () => {
    const form = {
      touched: {
        [fieldName]: false,
      },
      errors: {
        [fieldName]: { id: 'test.error' },
      },
    };

    component.setProps({ form });

    expect(component).toMatchSnapshot();
  });

  it('with string placeholder', () => {
    component.setProps({ placeholder: 'Fake placeholder' });

    expect(component).toMatchSnapshot();
  });

  it('when field has status', () => {
    const form = {
      ...defaultProps.form,
      status: {
        [fieldName]: 'warning',
      },
    };

    component.setProps({ form });

    expect(component).toMatchSnapshot();
  });

  it('when field tooltip not empty', () => {
    component.setProps({ tooltip: { id: 'text.test' } });

    expect(component).toMatchSnapshot();
  });
});
