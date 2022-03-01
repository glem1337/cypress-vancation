import PropTypes from 'prop-types';
import { Field } from 'formik';

import InputField from 'views/shared/InputField';

const Search = ({ onChange }) => (
  <Field
    name="search"
    component={InputField}
    formItemClasses="d-inline-flex mr-8 mb-0 w-100"
    prefix={<i className="icon icon-search" />}
    placeholder={{ id: 'shared.search' }}
    onChangeHandler={onChange}
  />
);

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Search;
