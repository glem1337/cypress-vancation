import PropTypes from 'prop-types';
import { Modal as AntdModal } from 'antd';

const Modal = ({
  children,
  visible,
  footer,
  closable,
  maskClosable,
  onClose,
  className,
  closeIcon,
  ...props
}) => (
  <AntdModal
    visible={visible}
    footer={footer}
    closable={closable}
    maskClosable={maskClosable}
    closeIcon={closeIcon}
    onCancel={onClose}
    className={className}
    bodyStyle={{
      padding: 0,
    }}
    style={{
      width: '100px',
    }}
    {...props}
  >
    {children}
  </AntdModal>
);

Modal.defaultProps = {
  visible: true,
  footer: null,
  closable: false,
  maskClosable: true,
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
  footer: PropTypes.node,
  closable: PropTypes.bool,
  maskClosable: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
  closeIcon: PropTypes.node,
};

export default Modal;
