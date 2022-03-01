import PropTypes from 'prop-types';
import { Modal as AntdModal } from 'antd';

const Modal = ({
  children,
  visible,
  title,
  footer,
  closable,
  onClose,
  className,
  closeIcon,
  ...props
}) => (
  <AntdModal
    visible={visible}
    title={title}
    footer={footer}
    closable={closable}
    onCancel={onClose}
    closeIcon={closeIcon}
    className={`main-modal ${className}`}
    {...props}
  >
    {children}
  </AntdModal>
);

Modal.defaultProps = {
  visible: true,
  title: null,
  footer: null,
  closable: true,
  onClose: undefined,
  className: null,
  closeIcon: <i className="icon icon-cross main-close-btn" />,
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node,
  ]).isRequired,
  visible: PropTypes.bool,
  title: PropTypes.node,
  footer: PropTypes.node,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
  closeIcon: PropTypes.node,
};

export default Modal;
