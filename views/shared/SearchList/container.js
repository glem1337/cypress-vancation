import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { trim } from 'ramda';

import SearchListComponent from './component';

class SearchList extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    filterEntities: PropTypes.func.isRequired,
  }

  static defaultProps = {
    defaultValue: '',
  }

  state = {
    searchQuery: this.props.defaultValue,
  }

  handleSearch = debounce((searchQuery) => {
    this.props.filterEntities({ name: searchQuery });
  }, 250)

  componentDidUpdate(prevProps) {
    const { defaultValue } = this.props;

    if (prevProps.defaultValue !== defaultValue) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ searchQuery: defaultValue });
    }
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ searchQuery: value });
    this.handleSearch(trim(value));
  }

  handleClear = () => {
    this.setState({ searchQuery: '' });
    this.handleSearch('');
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <SearchListComponent
        {...this.props}
        value={searchQuery}
        onChange={this.handleChange}
        onClear={this.handleClear}
      />
    );
  }
}

export default SearchList;
