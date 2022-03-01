/* eslint-disable react/prop-types */
import { Input, Space } from 'antd';
import Modal from '../../shared/Modal';

const SearchModal = ({ visible, modalToggle }) => (
  <Modal
    visible={visible}
    className="main-modal main-modal--mob-full main-modal--search"
    onClose={modalToggle}
  >
    <div className="main-modal__container">
      <div className="main-modal__header">
        <Input
          className="main-input--round"
          prefix={<i className="icon icon-search" />}
          placeholder="Where are you going?"
          allowClear
        />
      </div>
      <div className="main-modal__body">
        <Space direction="vertical" size={16}>
          {/* Filter items by input data */}
          <div className="d-flex align-items-center">
            <div className="main-dropdown__item-home-search">
              <img src="/images/home/LocationBack.svg" alt="" />
              <div className="main-dropdown__item-home-search-icon">
                <i className="icon icon-location-f in-black font-16" />
              </div>
            </div>
            <span className="in-black">Explore popular destinations</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="main-dropdown__item-home-search">
              <img src="https://bit.ly/3xkPLKU" alt="" />
            </div>
            <span className="in-black">Ely, Nevada</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="main-dropdown__item-home-search">
              <i className="icon icon-city in-black" />
            </div>
            <span className="in-black">Pueblo, Colorado</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="main-dropdown__item-home-search">
              <i className="icon icon-city in-black" />
            </div>
            <span className="in-black">Phoenix, Arizona</span>
          </div>
        </Space>
      </div>
    </div>
  </Modal>
  );

export default SearchModal;
