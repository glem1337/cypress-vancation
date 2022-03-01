import React from 'react';
import PropTypes from 'prop-types';
import { is } from 'ramda';
import { FormattedMessage } from 'react-intl';

const FormattedOrRawMessage = ({ message }) => {
  if (is(String, message) || is(Number, message)) {
    return message;
  }

  if (is(Object, message) && is(String, message.id)) {
    return (<FormattedMessage {...message} />);
  }

  return 'Error: Unexpeceted empty message';
};

FormattedOrRawMessage.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
};

FormattedOrRawMessage.defaultProps = {
  message: undefined,
};

export default FormattedOrRawMessage;
