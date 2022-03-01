import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import BackBtn from 'views/shared/BackBtn';
import BtnGradient from 'views/shared/BtnGradient';
import { Button } from 'antd';

const AddNewCamperBtnForm = ({
  withBackBtn,
  onBackClick,
  onSaveClick,
  canSave,
  isSubmitting,
  showGradientButton,
}) => {
  const { formatMessage } = useIntl();

  return (
    <div className="main-listing__footer">
      <div className="main-listing__footer-container">
        {withBackBtn && (
          <BackBtn
            text={formatMessage({ id: 'shared.back' })}
            onClick={onBackClick}
          />
        )}
        {!showGradientButton && (
          <Button
            size="large"
            className="min-w-160 ml-auto"
            text={formatMessage({ id: 'shared.saveAndContinue' })}
            onClick={onSaveClick}
            loading={isSubmitting}
          >
            {formatMessage({ id: 'shared.saveAndContinue' })}
          </Button>
        )}
        {showGradientButton && (
          <BtnGradient
            size="large"
            text={formatMessage({ id: 'shared.saveAndContinue' })}
            className="min-w-160 ml-auto"
            onClick={onSaveClick}
            disabled={!canSave}
            loading={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

AddNewCamperBtnForm.defaultProps = {
  withBackBtn: false,
  onBackClick: undefined,
  onSaveClick: undefined,
  canSave: true,
  isSubmitting: false,
  showGradientButton: true,
};

AddNewCamperBtnForm.propTypes = {
  withBackBtn: PropTypes.bool,
  onBackClick: PropTypes.func,
  onSaveClick: PropTypes.func,
  canSave: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  showGradientButton: PropTypes.bool,
};

export default AddNewCamperBtnForm;
