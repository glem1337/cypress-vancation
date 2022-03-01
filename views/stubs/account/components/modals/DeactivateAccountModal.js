import { Button } from 'antd';
import PasswordInput from 'views/stubs/shared/inputs/textfield/PasswordInput';
import Modal from '../../../shared/Modal';

const DeactivateAccountModal = () => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Deactivate account
        </h2>
      </div>
      <div className="main-modal__body">
        <p className="mb-24">
          Enter your password to confirm you want to deactivate your account.
        </p>
        <PasswordInput
          className="mb-0"
          labelText="Password"
        />
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <Button type="text" size="large">
            Cancel
          </Button>
          {/* When password is filled, make button type - danger  */}
          <Button
            className="min-w-140"
            type="danger-outline"
            size="large"
          >
            Deactivate
          </Button>
        </div>
      </div>
    </div>
  </Modal>
);

export default DeactivateAccountModal;
