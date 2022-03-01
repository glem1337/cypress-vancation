import PropTypes from 'prop-types';
import { Button, Form } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';

import InputField from 'views/shared/InputField';
import Modal from 'views/shared/Modal';
import BtnGradient from 'views/shared/BtnGradient';

const ImportModal = ({ onClose, handleSubmit, isLoading, isValid }) => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <Form layout="vertical">
        <div className="main-modal__header">
          <h2 className="main-modal__title">
            <FormattedMessage id="calendar.import.modal.title" />
          </h2>
        </div>
        <div className="main-modal__body">
          <Field
            id="name"
            name="name"
            label={{ id: 'calendar.import.modal.labelName' }}
            component={InputField}
          />
          <Field
            className="mb-0"
            formItemClasses="mb-0"
            id="link"
            name="link"
            type="url"
            component={InputField}
            label={{ id: 'calendar.import.modal.labelUrl' }}
          />
        </div>
        <div className="main-modal__footer justify-content-flex-end">
          <Button
            className="mr-16"
            onClick={onClose}
            disabled={isLoading}
            type="text"
            size="large"
          >
            <FormattedMessage id="shared.cancel" />
          </Button>
          <BtnGradient
            className="min-w-140"
            disabled={!isValid || isLoading}
            loading={isLoading}
            onClick={handleSubmit}
            size="large"
            text={{ id: 'calendar.import.modal.btn' }}
          />
        </div>
      </Form>
    </div>
  </Modal>
);

ImportModal.defaultProps = {
  isLoading: false,
};

ImportModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
};

export default ImportModal;
