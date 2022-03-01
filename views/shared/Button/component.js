import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { is } from 'ramda';
import { Button as AntButton } from 'antd';

const Button = ({ text, ...rest }) => (
  <AntButton {...rest}>
    {is(Object, text) ? <FormattedMessage {...text} /> : text}
  </AntButton>
);

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
};

Button.displayName = 'Button';

export default Button;
