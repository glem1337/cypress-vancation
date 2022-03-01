import React from 'react';
import { Alert, Avatar, Button } from 'antd';
import Dropdown from 'views/stubs/shared/dropdowns/Dropdown';
import ChatMessagesDivider from './ChatMessagesDivider';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';

const ChatBody = () => (
  <div className="chat-body">
    <div className="chat-alerts">
      <Alert
        type="upcoming"
        className="mb-24"
        showIcon
        icon={<i className="icon icon-alert" />}
        message="The next dates are double-booked on Outdoorsy: Dec 1 - Dec 2, 2020."
      />
      <Alert
        type="info"
        className="mb-24 alert--big"
        showIcon
        icon={<i className="icon icon-info" />}
        message="Waiting for your confirmation (24h)."
        action={(
          <div>
            <MainBtnGradient
              className="mr-8"
              text="Confirm booking"
              size="small"
            />
            <Button
              type="danger"
              size="small"
            >
              Reject booking
            </Button>
          </div>
        )}
      />
    </div>
    <div className="chat-msgs">
      <section className="chat-msgs__section">
        <ChatMessagesDivider />
        { new Array(1).fill(10).map(() => (
          <article className="chat-msg chat-msg--left">
            <Avatar
              className="flex-shrink-0 mr-16"
              size="large"
              src="https://randomuser.me/api/portraits/women/87.jpg"
            />
            <div className="chat-msg__txt">
              <div className="mb-4">
                <p className="in-black">
                  Hi Rodney, I will be glad to help you with any questions!😁
                </p>
              </div>
              <p className="text-caption text-align-right">9:58 am</p>
            </div>
          </article>
        )) }
        <article className="chat-msg chat-msg--left">
          <Avatar
            className="chat-msg-logo"
            size="large"
            src="/images/logo/logo-hand-white.svg"
          />
          <div className="chat-msg__txt">
            <div className="mb-4">
              <p className="mb-16 in-black">
                You’ll need to sign the rental contract in order to complete your booking.
              </p>
              <MainBtnGradient
                className="w-100"
                size="large"
                text="Sign rental contract"
              />
            </div>
            <p className="text-caption text-align-right">9:58 am</p>
          </div>
        </article>
      </section>
      <section className="chat-msgs__section chat-msgs__section-user">
        <ChatMessagesDivider />
        { new Array(1).fill(10).map(() => (
          <article className="chat-msg">
            <div className="chat-msg__col-left">
              <Dropdown
                placement="bottomRight"
                overlayClassName="min-w-160"
                icon={(
                  <i className="icon icon-options-vertical in-gray-500 c-pointer" />
                )}
              >
                <div className="main-dropdown-wrap">
                  <div className="main-dropdown__body">
                    <div className="main-dropdown__item">
                      <i className="icon icon-edit-pencil mr-8 in-gray-500" />
                      Edit
                    </div>
                    <div className="main-dropdown__item">
                      <i className="icon icon-duplicate mr-8 in-gray-500" />
                      Copy
                    </div>
                    <div className="main-dropdown__item">
                      <i className="icon icon-delete mr-8 in-gray-500" />
                      Remove
                    </div>
                  </div>
                </div>
              </Dropdown>
            </div>
            <div className="chat-msg__txt">
              <div className="mb-4">
                <p className="in-black">
                  Hi Rodney, I will be glad to help you with any questions!😁
                </p>
              </div>
              <p className="text-caption text-align-right">9:58 am</p>
            </div>
          </article>
        )) }
      </section>
    </div>
  </div>
);

export default ChatBody;
