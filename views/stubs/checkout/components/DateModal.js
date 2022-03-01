/* eslint-disable react/prop-types */
import { Button, DatePicker } from 'antd';
import Modal from '../../shared/Modal';

const { RangePicker } = DatePicker;

const DateModal = (props) => (
  <Modal
    className="main-modal main-modal--mob-full main-modal-date"
    {...props}
  >
    <div className="main-modal__container">
      <div className="main-modal__header">
        <div className="text-title">Nov 16 - Dec 8</div>
        <div className="mt-8">
          Minimum stay:
          {' '}
          <span className="in-black font-600">2 nights</span>
        </div>
        <Button className="ant-btn-link ant-btn-flat pl-0 pr-0 main-modal-date-clear">Clear</Button>
      </div>
      <div className="main-modal__body">
        <div id="static-rangepicker" className="static-rangepicker" />
        <RangePicker
          open
          format="MMM D, YYYY"
          getPopupContainer={() => document.getElementById('static-rangepicker')
          }
        />
      </div>
    </div>
  </Modal>
);

export default DateModal;
