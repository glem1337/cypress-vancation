import { Form, Input, Button } from 'antd';
import Modal from 'views/stubs/shared/Modal';
import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';

const SyncCalendar = () => (
  <Modal className="main-modal" closable={false}>
    <div className="main-modal__container">
      <Form layout="vertical">
        <div className="main-modal__header">
          <h2 className="main-modal__title">Sync calendar</h2>
        </div>
        <div className="main-modal__body">
          <Form.Item
            label={<span className="main-input__label">Calendar name</span>}
          >
            <Input defaultValue="Calendar name one" />
          </Form.Item>
          <Form.Item
            className="mb-0"
            label={<span className="main-input__label">Calendar URL</span>}
          >
            <Input
              className="mb-0"
              defaultValue="https://calendar.google.com/calendar/u/0/r?tab=rc"
            />
          </Form.Item>
        </div>
        <div className="main-modal__footer justify-content-flex-end">
          <Button className="mr-16" type="text" size="large">
            Cancel
          </Button>
          <MainBtnGradient
            className="min-w-140"
            text="Sync calendar"
            size="large"
          />
        </div>
      </Form>
    </div>
  </Modal>
);

export default SyncCalendar;
