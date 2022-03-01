import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import ROUTES from 'constants/routes';

import Button from 'views/shared/Button';
import Modal from 'views/shared/Modal';

const EmailTokenExpiredModal = ({ onClose, intl }) => (
  <Modal className="main-modal" maskClosable={false}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          <FormattedMessage id="emailTokenExpiredModal.title" />
        </h2>
      </div>
      <div className="main-modal__body">
        <div className="mt-24 mb-24 text-align-center">
          <img
            src="/images/auth/Reset_Password_Link_Expired.svg"
            alt={intl.formatMessage({ id: 'emailTokenExpiredModal.imgAlt' })}
          />
        </div>
        <p>
          <FormattedMessage id="emailTokenExpiredModal.description" />
        </p>
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <Link href={ROUTES.RESET_PASSWORD.PATH}>
            <a>
              <Button
                onClick={onClose}
                type="secondary"
                size="large"
                text={{ id: 'emailTokenExpiredModal.btnToResetPassword' }}
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  </Modal>
);

EmailTokenExpiredModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  intl: PropTypes.shape().isRequired,
};

export default EmailTokenExpiredModal;
