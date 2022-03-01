import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { Form } from 'antd';

import ROUTES from 'constants/routes';
import { RECOVERY_MODAL_NOTIFICATIONS_CONTEXT } from 'state/notifications/notificationsContexts';

import NotificationsDock from 'views/NotificationsDock';
import Alert from 'views/shared/Alert';
import Button from 'views/shared/Button';
import Modal from 'views/shared/Modal';

const PasswordRecoveryModal = ({
  email,
  onClose,
  intl,
  isSubmitting,
  handleSubmit,
  status,
}) => (
  <Modal className="main-modal" maskClosable={false}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <NotificationsDock context={RECOVERY_MODAL_NOTIFICATIONS_CONTEXT} />
        {status && status.email && status.email.length && (
          <Alert
            type="error"
            message={status.email}
            showIcon
            icon={<i className="icon icon-info" />}
          />
        )}
        <h2 className="main-modal__title">
          <FormattedMessage id="passwordRecoveryModal.title" />
        </h2>
      </div>
      <div className="main-modal__body">
        <div className="mt-24 mb-24 text-align-center">
          <img
            src="/images/auth/Reset_Password_Link.svg"
            alt={intl.formatMessage({ id: 'passwordRecoveryModal.imgAlt' })}
          />
        </div>
        <p className="mb-8">
          <FormattedMessage id="passwordRecoveryModal.description.first" />
        </p>
        <a
          href={`mailto:${email}`}
          className="main-link d-inline-block mb-16 in-black font-600"
        >
          {email}
        </a>
        <p>
          <FormattedMessage id="passwordRecoveryModal.description.second" />
        </p>
      </div>
      <div className="main-modal__footer justify-content-space-between">
        <Link href={ROUTES.LOGIN.PATH}>
          <a>
            <Button
              onClick={onClose}
              text={{ id: 'passwordRecoveryModal.btnToLogin' }}
              type="link"
              className="p-0"
            />
          </a>
        </Link>
        <Form>
          <Button
            text={{ id: 'passwordRecoveryModal.btnResend' }}
            type="secondary"
            size="large"
            disabled={isSubmitting}
            loading={isSubmitting}
            onClick={handleSubmit}
          />
        </Form>
      </div>
    </div>
  </Modal>
);

PasswordRecoveryModal.defaultProps = {
  status: undefined,
};

PasswordRecoveryModal.propTypes = {
  email: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  status: PropTypes.shape({
    email: PropTypes.string,
  }),
};

export default PasswordRecoveryModal;
