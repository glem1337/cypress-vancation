import { Alert } from 'antd';
import PropTypes from 'prop-types';

const AlertEmail = ({
  children,
}) => (
  <Alert
    className="mt-16 mb-0"
    type="warning"
    showIcon
    icon={<i className="icon icon-alert" />}
    message={children}
  />
);

AlertEmail.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertEmail;
