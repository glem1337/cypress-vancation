import React from 'react';
import { injectIntl } from 'react-intl';
import { compose, find, omit, pathOr } from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import deepEqual from 'fast-deep-equal';

import { geocoderListSelector } from 'state/concepts/mapbox/selectors';
import { fetchGeocoder } from 'state/concepts/mapbox/actions';
import GeocoderFieldComponent from './component';

class GeocoderField extends React.Component {
  constructor(props) {
    super(props);
    this.fetchGeocoder = debounce(props.fetchGeocoder, 300);

    this.state = {
      defaultValue: pathOr('', ['field', 'value', 'place'], props),
    };
  }

  componentDidUpdate(prevProps) {
    const { field } = this.props;

    if (!deepEqual(prevProps.field.value, field.value)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        defaultValue: pathOr('', ['value', 'place'], field),
      });
    }
  }

  handleSearch = searchText => {
    this.setState({
      defaultValue: searchText,
    });

    this.fetchGeocoder(searchText);
  }

  handlerChange = searchText => {
    const { field: { name }, form: { setFieldValue } } = this.props;

    if (!searchText || !searchText.length) {
      setFieldValue(name, {});
    }
  }

  handlerBlur = () => {
    const { field: { name }, form: { setFieldTouched } } = this.props;

    setFieldTouched(name);
  }

  handlerSelect = (value) => {
    const { geocoderList, field: { name }, form: { setFieldValue } } = this.props;
    const data = find(elem => elem.place === value, geocoderList);

    setFieldValue(name, data);
  }

  get options() {
    const { geocoderList } = this.props;

    return geocoderList.map(({ place }) => ({ value: place }));
  }

  render = () => {
    const props = omit(['geocoderList', 'fetchGeocoder'], this.props);

    return (
      <GeocoderFieldComponent
        {...props}
        {...this.state}
        options={this.options}
        handleSearch={this.handleSearch}
        handlerBlur={this.handlerBlur}
        handlerSelect={this.handlerSelect}
        handlerChange={this.handlerChange}
      />
    );
  }
}

GeocoderField.defaultProps = {
  geocoderList: [],
};

GeocoderField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.shape().isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
  fetchGeocoder: PropTypes.func.isRequired,
  geocoderList: PropTypes.arrayOf(PropTypes.shape()),
};

const mapStateToProps = state => ({
  geocoderList: geocoderListSelector(state),
});

const mapDispatchToProps = {
  fetchGeocoder,
};

export { GeocoderField as GeocoderFieldContainer };
export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
)(GeocoderField);
