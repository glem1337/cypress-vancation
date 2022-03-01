import { Button } from 'antd';
import Modal from '../../../shared/Modal';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';
import PasswordInput from '../../../shared/inputs/textfield/PasswordInput';

const ChangePasswordModal = () => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Change password
        </h2>
      </div>
      <div className="main-modal__body">
        <p className="mb-24">
          Enter new unique password to protect your account.
        </p>
        <PasswordInput
          labelText="Current password"
          isPassw
          togglePassw
          forgotPass
        />
        <PasswordInput
          className="mb-0"
          labelText="New password"
          message="Use a minimum password length of 6 or more characters"
          iconInfo
          scaleStep
        />
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <Button type="text" size="large">
            Cancel
          </Button>
          {/* First this button outline and when form is filled, than its gradient */}
          <MainBtnGradient
            className="min-w-140 ml-16"
            text="Change password"
            size="large"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default ChangePasswordModal;
