import React from 'react';
import { Select } from 'antd';
import Modal from '../../../shared/Modal';
import ReviewItem from '../ReviewItem';

const AllReviewsModal = () => (
  <Modal className="main-modal main-modal-reviews">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          All reviews (26)
        </h2>
      </div>
      <div className="main-modal__body">
        <Select
          id="Nights"
          name="fieldName"
          className="main-input__field mb-24"
          optionLabelProp="label"
        >
          <Select.Option className="p-0" value="select1" label="+1">
            <li className="main-dropdown__item">2 nights</li>
          </Select.Option>
          <Select.Option className="p-0" value="select2" label="+2">
            <li className="main-dropdown__item">3 nights</li>
          </Select.Option>
        </Select>
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
      </div>
    </div>
  </Modal>
);

export default AllReviewsModal;
