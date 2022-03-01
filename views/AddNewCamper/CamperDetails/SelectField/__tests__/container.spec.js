import { shallow } from 'enzyme';
import intl from 'utils/testHelpers/fakeIntl';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import Options from 'views/AddNewCamper/CamperDetails/SelectField/Options';
import SelectField, { SelectFieldContainer } from '../container';

describe('SelectField container', () => {
  let wrapper;
  let container;
  let instance;
  const fieldName = 'fieldName';
  const defaultProps = {
    field: { value: '', name: fieldName },
    placeholder: { id: 'fake.placeholder' },
    intl,
    label: { id: 'fake.label' },
    form: {
      touched: {},
      errors: {},
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    },
    items: [
      { value: 'test_1', label: 'test_1' },
      { value: 'test_2', label: 'test_2' },
    ],
    onSelect: jest.fn(),
    autoSave: false,
    showSearch: false,
    renderItem: jest.fn(({ value, label }) => <span>{label + value}</span>),
    numbersOnly: true,
  };

  beforeEach(() => {
    wrapper = shallow(<SelectField {...defaultProps} />);
    container = diveTo(wrapper, SelectFieldContainer);
    instance = container.instance();
    jest.clearAllMocks();
  });

  it('injects `intl` prop to PhoneInput component', () => {
    expect(wrapper.props().intl).not.toBeUndefined();
  });

  describe('handleChange()', () => {
    it('default props', () => {
      const value = '12345';
      instance.handleChange(value);

      expect(defaultProps.form.setFieldValue).toHaveBeenCalledTimes(1);
      expect(defaultProps.form.setFieldValue).toHaveBeenCalledWith(fieldName, value);
      expect(defaultProps.onSelect).toHaveBeenCalledTimes(1);
    });

    it('onSelect is empty', () => {
      const value = '12345';

      container.setProps({ onSelect: null });
      instance.handleChange(value);

      expect(defaultProps.form.setFieldValue).toHaveBeenCalledTimes(1);
      expect(defaultProps.form.setFieldValue).toHaveBeenCalledWith(fieldName, value);
      expect(defaultProps.onSelect).not.toHaveBeenCalled();
    });
  });

  it('handleBlur()', () => {
    instance.handleBlur();

    expect(defaultProps.form.setFieldTouched).toHaveBeenCalledTimes(1);
    expect(defaultProps.form.setFieldTouched).toHaveBeenCalledWith(fieldName);
  });

  describe('onSearch()', () => {
    it('default props', () => {
      expect(container.props().onSearch).toBeUndefined();
    });

    it('showSearch = true, autoSave = true', () => {
      container.setProps({ showSearch: true, autoSave: true });

      expect(container.props().onSearch).not.toBeUndefined();
    });
  });

  describe('handleSearch()', () => {
    it('value is not empty', () => {
      const value = '1111';

      instance.handleSearch(value);

      expect(defaultProps.form.setFieldValue).toHaveBeenCalledTimes(1);
      expect(defaultProps.form.setFieldValue).toHaveBeenCalledWith(fieldName, value);
    });

    it('value is empty', () => {
      instance.handleSearch('');

      expect(defaultProps.form.setFieldValue).not.toHaveBeenCalled();
    });

    it('value is NaN', () => {
      instance.handleSearch('aaaa');

      expect(defaultProps.form.setFieldValue).not.toHaveBeenCalled();
    });
  });

  describe('get items()', () => {
    it('default props', () => {
      expect(instance.items)
        .toEqual(defaultProps.items.map(({ value, label }) => <span>{label + value}</span>));
    });

    it('renderItem are empty', () => {
      container.setProps({ renderItem: null });

      expect(instance.items).toEqual(defaultProps.items.map(Options));
    });

    it('items are empty', () => {
      container.setProps({ items: [] });

      expect(instance.items).toEqual([]);
    });
  });
});
