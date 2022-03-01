import { shallow } from 'enzyme';
import intl from 'utils/testHelpers/fakeIntl';
import GeocoderFieldComponent from 'views/shared/GeocoderField/component';
import { mockedGeocoderList } from 'state/concepts/mapbox/__mocks__/mockFetchGeocoder';

describe('GeocoderField component', () => {
  let component;
  const fieldName = 'fieldName';
  const defaultProps = {
    field: { value: {}, name: fieldName },
    form: { touched: {}, errors: {} },
    placeholder: { id: 'fake.placeholder' },
    tooltip: { id: 'fake.tooltip' },
    label: { id: 'test.fieldLabel' },
    options: [],
    intl,
    value: '',
    handlerChange: jest.fn(),
    handleSearch: jest.fn(),
    handlerBlur: jest.fn(),
    handlerSelect: jest.fn(),
    defaultValue: 'defaultValue',
  };

  beforeEach(() => {
    component = shallow(<GeocoderFieldComponent {...defaultProps} />);
  });

  it('default props snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('with "disabled" snapshot', () => {
    component.setProps({ disabled: true });

    expect(component).toMatchSnapshot();
  });

  it('with "field value" snapshot', () => {
    component.setProps({ field: { value: mockedGeocoderList[0], name: fieldName } });

    expect(component).toMatchSnapshot();
  });

  it('with string placeholder snapshot', () => {
    component.setProps({ placeholder: 'Fake placeholder' });

    expect(component).toMatchSnapshot();
  });

  it('when field is touched and has error snapshot', () => {
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

  it('when field is touched but has no error snapshot', () => {
    const form = {
      touched: {
        [fieldName]: true,
      },
      errors: {},
    };

    component.setProps({ form });

    expect(component).toMatchSnapshot();
  });
});
