import { shallow } from 'enzyme';
import intl from 'utils/testHelpers/fakeIntl';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import GeocoderField, { GeocoderFieldContainer } from 'views/shared/GeocoderField/container';
import { mockedGeocoderList } from 'state/concepts/mapbox/__mocks__/mockFetchGeocoder';
import configureStore from 'redux-mock-store';

jest.mock('state/concepts/mapbox/selectors', () => ({
  geocoderListSelector: jest.fn(() => mockedGeocoderList),
}));

describe('GeocoderField container', () => {
  let wrapper;
  let container;
  let instance;
  let setStateSpy;
  const fieldName = 'fieldName';
  const store = configureStore()({});

  store.dispatch = jest.fn();

  const defaultProps = {
    intl,
    store,
    placeholder: { id: 'fake.placeholder' },
    label: { id: 'fake.label' },
    form: {
      touched: {},
      errors: {},
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    },
    field: {
      value: {
        place: 'test',
      },
      name: fieldName,
    },
    fetchGeocoder: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallow(<GeocoderField {...defaultProps} />);
    container = diveTo(wrapper, GeocoderFieldContainer);
    instance = container.instance();
    setStateSpy = jest.spyOn(instance, 'setState');
  });

  it('test `componentDidUpdate` lifecycle method', () => {
    instance.componentDidUpdate({
      field: {
        value: {
          place: 'not the same place',
        },
      },
    });

    const defaultValue = defaultProps.field.value.place;

    expect(setStateSpy).toHaveBeenCalledWith({ defaultValue });
  });

  it('injects `intl` prop to PhoneInput component', () => {
    expect(wrapper.props().intl).not.toBeUndefined();
  });

  it('tests "handleSearch" instance method', () => {
    const fetchGeocoderSpyOn = jest.spyOn(instance, 'fetchGeocoder');

    instance.handleSearch('test');

    expect(setStateSpy).toHaveBeenCalledWith({ defaultValue: 'test' });
    expect(fetchGeocoderSpyOn).toHaveBeenCalledTimes(1);
    expect(fetchGeocoderSpyOn).toHaveBeenCalledWith('test');
  });

  describe('tests "handlerChange" instance method', () => {
    it('searchText is empty', () => {
      instance.handlerChange('');

      expect(defaultProps.form.setFieldValue).toHaveBeenCalledTimes(1);
      expect(defaultProps.form.setFieldValue).toHaveBeenCalledWith(fieldName, {});
    });

    it('searchText is not empty', () => {
      instance.handlerChange('test');

      expect(defaultProps.form.setFieldValue).not.toBeCalled();
    });
  });

  it('tests "handleBlur" instance method', () => {
    instance.handlerBlur();

    expect(defaultProps.form.setFieldTouched).toHaveBeenCalledTimes(1);
    expect(defaultProps.form.setFieldTouched).toHaveBeenCalledWith(fieldName);
  });

  it('tests "handlerSelect" instance method', () => {
    instance.handlerSelect(mockedGeocoderList[0].place);

    expect(defaultProps.form.setFieldValue).toHaveBeenCalledTimes(1);
    expect(defaultProps.form.setFieldValue).toHaveBeenCalledWith(fieldName, mockedGeocoderList[0]);
  });

  it('tests "options" instance getter', () => {
    expect(instance.options).toEqual([{ value: mockedGeocoderList[0].place }]);
  });
});
