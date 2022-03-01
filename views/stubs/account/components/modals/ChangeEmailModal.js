import { Input, Button } from 'antd';
import Modal from '../../../shared/Modal';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';
import PasswordInput from '../../../shared/inputs/textfield/PasswordInput';

const ChangeEmailModal = () => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Change email
        </h2>
      </div>
      <div className="main-modal__body">
        <p className="mb-16">
          Please enter your new email and confirm email updating with your password.
        </p>
        <p className="mb-24">
          Your current email:
          <a href="" className="main-link in-black font-600 ml-8">rodney.harmon@gmail.com</a>
        </p>
        <div>
          <label htmlFor="email" className="main-input__label">
            Enter new email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="cory.hubbard@gmail.com"
          />
        </div>
        <PasswordInput
          className="mb-0"
          labelText="Verify password"
          forgotPass
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
            text="Update email"
            size="large"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default ChangeEmailModal;
