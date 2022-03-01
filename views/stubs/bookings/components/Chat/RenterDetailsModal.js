import React from 'react';
import { Tag } from 'antd';
import Modal from '../../../shared/Modal';

const RenterDetailsModal = () => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Renter details
        </h2>
      </div>
      <div className="main-modal__body mt-24">
        <div className="mb-16">
          <Tag
            color="success"
            icon={<i className="icon icon-activate-f mr-4 in-green-1000 font-16" />}
          >
            Driver’s License verified
          </Tag>
        </div>
        <div className="mb-16">
          <div className="d-flex align-items-center mr-20">
            <img className="mr-4" src="/images/listing/Like-Green.svg" alt="" />
            <span className="in-green-300">98%</span>
          </div>
        </div>
        <div className="mb-16">
          <a className="d-inline-flex align-items-center mr-16 text-color-gray" href="tel:+1 766-732-6732">
            <i className="icon icon-phone mr-4 in-gray-500 font-20" />
            +1 766-732-6732
          </a>
        </div>
        <div>
          <a className="d-inline-flex align-items-center mr-4 text-color-gray" href="mailto:dean.joseph@gmail.com">
            <i className="icon icon-email mr-4 in-gray-500 font-20" />
            dean.joseph@gmail.com
          </a>
        </div>
      </div>
    </div>
  </Modal>
);

export default RenterDetailsModal;
