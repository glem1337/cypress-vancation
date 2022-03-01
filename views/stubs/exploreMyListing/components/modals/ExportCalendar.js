import { Button, Input } from 'antd';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';
import Modal from '../../../shared/Modal';

const ExportCalendar = () => (
  <Modal className="main-modal" closable={false}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">Export calendar</h2>
      </div>
      <div className="main-modal__body">
        <span className="main-input__label mb-4">Calendar URL</span>
        <div className="d-flex">
          <Input
            className="main-input-group--left flex-1 mb-0"
            placeholder="Enter URL"
            defaultValue="https://calendar.google.com/calendar/u/0/r?tab=rc"
          />
          <MainBtnGradient
            className="main-input-group--right"
            text="Copy"
            size="large"
          />
        </div>
      </div>
      <div className="main-modal__footer justify-content-flex-end">
        <Button type="text" size="large">
          Cancel
        </Button>
        <MainBtnGradient
          className="min-w-140 ml-16"
          text="Download"
          size="large"
          icon={<i className="icon icon-download font-18" />}
        />
      </div>
    </div>
  </Modal>
);

export default ExportCalendar;
