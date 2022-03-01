import { Button } from 'antd';
import Modal from '../../../shared/Modal';

const RemoveCalendar = () => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Remove calendar
        </h2>
      </div>
      <div className="main-modal__body">
        <p>
          Are you sure you want to remove this calendar?
        </p>
      </div>
      <div className="main-modal__footer justify-content-flex-end">
        <Button type="text" size="large">
          Cancel
        </Button>
        <Button className="min-w-140 ml-16" type="danger" size="large">
          Remove
        </Button>
      </div>
    </div>
  </Modal>
);

export default RemoveCalendar;
