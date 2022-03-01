import { Button } from 'antd';
import Modal from '../../../shared/Modal';

const RemoveCamper = () => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Remove camper
        </h2>
      </div>
      <div className="main-modal__body">
        <p>
          Are you sure you want to remove this camper?
        </p>
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <Button type="text" size="large">
            Cancel
          </Button>
          <Button
            type="danger"
            size="large"
            className="min-w-140 ml-16"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  </Modal>
);

export default RemoveCamper;
