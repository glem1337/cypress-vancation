import { Form, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';

import { MODAL_DESCRIPTION } from 'constants/camperDetails/owner';

import Modal from 'views/shared/Modal';
import BtnGradient from 'views/shared/BtnGradient';
import DateRangeField from 'views/shared/DateRangeField';
import InputField from 'views/shared/InputField';

const AskQuestionModal = ({
  onClose,
  handleSubmit,
  blockedPeriods,
  onActiveStartDateChange,
  isFormValid,
  isLoading,
  values,
  placeholder,
}) => (
  <Modal onClose={onClose} className="main-modal">
    <Form layout="vertical">
      <div className="main-modal__container">
        <div className="main-modal__header">
          <h2 className="main-modal__title">
            <FormattedMessage id="shared.askQuestion" />
          </h2>
        </div>
        <div className="main-modal__body">
          <Field
            name="dateRange"
            component={DateRangeField}
            blockedPeriods={blockedPeriods}
            onActiveStartDateChange={onActiveStartDateChange}
          />
          <Form.Item className="mt-16 mb-0">
            <div className="main-input-textarea-wrap mb-0">
              <Field
                name="description"
                id="description"
                component={InputField}
                asComponent={Input.TextArea}
                rows={5}
                placeholder={{
                  id: 'shared.askQuestionName',
                  values: {
                    name: placeholder,
                  },
                }}
                tooltip={{
                  id: 'validations.characterCurrentMax',
                  values: {
                    current: values.description.length,
                    max: MODAL_DESCRIPTION.MAX,
                  },
                }}
              />
            </div>
          </Form.Item>
        </div>
        <div className="main-modal__footer">
          <div className="ml-auto">
            <Button
              disabled={isLoading}
              onClick={onClose}
              type="text"
              size="large"
            >
              <FormattedMessage id="shared.cancel" />
            </Button>
            {!isFormValid && (
              <Button
                onClick={handleSubmit}
                className="min-w-140 ml-16"
                size="large"
              >
                <FormattedMessage id="shared.send" />
              </Button>
            )}
            {isFormValid && (
              <BtnGradient
                onClick={handleSubmit}
                isLoading={isLoading}
                disabled={isLoading}
                className="min-w-140 ml-16"
                text={{ id: 'shared.send' }}
                size="large"
              />
            )}
          </div>
        </div>
      </div>
    </Form>
  </Modal>
);

AskQuestionModal.defaultProps = {
  isLoading: false,
};

AskQuestionModal.propTypes = {
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onActiveStartDateChange: PropTypes.func.isRequired,
  blockedPeriods: PropTypes.shape().isRequired,
  values: PropTypes.shape().isRequired,
  isFormValid: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default AskQuestionModal;
