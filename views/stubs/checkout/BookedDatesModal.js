import { Button } from 'antd';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';
import Modal from '../shared/Modal';

const BookedDatesModal = () => (
  <Modal className="main-modal" closable={false}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">Campervan is already booked</h2>
      </div>
      <div className="main-modal__body">
        <p>
          Someone booked this van for one of your dates while you were checking
          out. Please try different dates, or search for another campervan in
          this location.
        </p>
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <Button type="secondary" size="large">
            Search another campervan
          </Button>
          <MainBtnGradient
            text="Change dates"
            size="large"
            className="min-w-md-140 ml-16"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default BookedDatesModal;
