import React from 'react';
import { Input } from 'antd';
import Modal from '../../shared/Modal';

const LocationModal = () => (
  <Modal className="main-modal main-modal--mob-full home-main-modal-location">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <Input
          className="home-main-modal-location__input"
          allowClear
          prefix={<i className="icon icon-search in-gray-500" />}
          placeholder="Where are you going?"
        />
      </div>
      <div className="main-modal__body">
        <div className="d-flex align-items-center mb-16">
          <div className="main-dropdown__item-home-search">
            <img src="/images/home/LocationBack.svg" alt="" />
            <div className="main-dropdown__item-home-search-icon">
              <i className="icon icon-location-f in-black font-16" />
            </div>
          </div>
          <span className="">Explore popular destinations</span>
        </div>
        <div className="d-flex align-items-center mb-16">
          <div className="main-dropdown__item-home-search">
            <img src="https://bit.ly/2SAxfz8" alt="" />
          </div>
          <span className="">Ely, Nevada</span>
        </div>
        <div className="d-flex align-items-center mb-16">
          <div className="main-dropdown__item-home-search">
            <i className="icon icon-city in-black" />
          </div>
          <span className="">Pueblo, Colorado</span>
        </div>
        <div className="d-flex align-items-center mb-16">
          <div className="main-dropdown__item-home-search">
            <i className="icon icon-city in-black" />
          </div>
          <span className="">Phoenix, Arizona</span>
        </div>
      </div>
    </div>
  </Modal>
);

export default LocationModal;
