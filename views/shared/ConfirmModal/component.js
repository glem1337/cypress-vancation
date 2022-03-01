import PropTypes from 'prop-types';
import Modal from 'views/shared/Modal';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

import Button from 'views/shared/Button';

const ConfirmModal = ({
  onClose,
  onSubmit,
  title,
  bodyText,
  submitText,
  submitClassName,
  dismissText,
  isLoading,
  kind,
}) => (
  <Modal className="main-modal d-block" onClose={onClose}>
    <div className="main-modal__container d-block">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          <FormattedMessage {...title} />
        </h2>
        <button type="button" className="main-modal__close icon icon-cross" onClick={onClose} />
      </div>
      <div className="main-modal__body">
        {bodyText.map((text, index) => (
          <p className={classnames({ 'mb-0': bodyText.length === index + 1 })} key={text.id}>
            <FormattedMessage {...text} />
          </p>
        ))}
      </div>
      <div className="main-modal__footer">
        <div>
          <Button
            className="main-modal__footer-action"
            text={dismissText}
            onClick={onClose}
            kind="flat"
          />
          <Button
            className={classnames('main-modal__footer-action', submitClassName)}
            type="submit"
            text={submitText}
            onClick={onSubmit}
            disabled={isLoading}
            kind={kind}
          />
        </div>
      </div>
    </div>
  </Modal>
);

ConfirmModal.defaultProps = {
  isLoading: undefined,
  kind: null,
  dismissText: { id: 'shared.cancel' },
  submitClassName: null,
};

ConfirmModal.propTypes = {
  kind: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape(),
  }).isRequired,
  bodyText: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      values: PropTypes.shape(),
    }),
  ).isRequired,
  submitText: PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape(),
  }).isRequired,
  dismissText: PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape(),
  }),
  submitClassName: PropTypes.string,
};

export default ConfirmModal;
