import { Input } from 'antd';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';
import Modal from '../../../shared/Modal';

const AddNewListingModal = () => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          How would you like to start?
        </h2>
      </div>
      <div className="main-modal__body">
        <MainBtnGradient
          text="List new camper"
          withGradient
          className="w-100 mt-16 mb-24"
        />
        <div className="mb-16 text-subheader">
          Duplicate from existing listing
        </div>
        <Input
          className="mb-16"
          prefix={<i className="icon icon-search" />}
          placeholder="Search"
        />
        <div>
          <a href="/" className="main-listing-small-card">
            <div className="main-listing-small-card__img">
              <img src="https://bit.ly/3xdDGa6" alt="" />
            </div>
            <p className="in-black font-600">
              {/* If length is bigger than 64 symbol, than truncate text */}
              Adventure Ready Class B Camper: 2020
              Mercedes Sprinter Winnebago Revel 4x4
            </p>
          </a>
          <a href="/" className="main-listing-small-card">
            <div className="main-listing-small-card__img">
              <img src="https://bit.ly/3gwIqkv" alt="" />
            </div>
            <p className="in-black font-600">
              Forest River Grey Wolf 2020
            </p>
          </a>
        </div>
      </div>
    </div>
  </Modal>
);

export default AddNewListingModal;
