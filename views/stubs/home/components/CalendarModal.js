import { DatePicker } from 'antd';
import React from 'react';
import Modal from '../../shared/Modal';

const { RangePicker } = DatePicker;

const CalendarModal = () => (
  <Modal className="main-modal main-modal--mob-full home-main-modal-calendar">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          When is your trip?
        </h2>
      </div>
      <div className="main-modal__body">
        <div id="static-rangepicker" className="static-rangepicker" />
        <RangePicker
          open
          format="MMM D, YYYY"
          getPopupContainer={() => document.getElementById('static-rangepicker')}
        />
      </div>
    </div>
  </Modal>
);

export default CalendarModal;
