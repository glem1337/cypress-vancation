import React from 'react';
import { Button, Image, Modal } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import PropTypes from 'prop-types';

import useContainer from './hook';

SwiperCore.use([Pagination]);

const PhotosModal = (props) => {
  const { photos } = props;

  const {
    isDesktop,
    hideModal,
    swiperRef,
    moveLeft,
    moveRight,
  } = useContainer(props);

  return (
    <Modal
      className="main-modal main-modal--van-gallery"
      visible
      closable={false}
      footer={false}
    >
      <div className="main-modal__container">
        <div className="main-modal__header">
          <Button
            icon={<i className="icon icon-cross" />}
            type="secondary"
            shape="circle"
            size="large"
            onClick={hideModal}
          />
        </div>
        <div className="main-modal__body">
          <div className="van-details__modal-gallery">
            {!isDesktop
              && photos.map((item, index) => (
                <Image
                  data-index={index}
                  key={item.id}
                  preview={false}
                  src={item.photoUrl1100}
                  alt=""
                />
              ))}
            {isDesktop && (
              <>
                <Swiper pagination={{ type: 'fraction' }} loop ref={swiperRef}>
                  {photos.map((item) => (
                    <SwiperSlide key={item.id}>
                      <Image preview={false} src={item.photoUrl1100} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Button
                  className="swiper-nav-prev"
                  size="large"
                  icon={<i className="icon icon-left font-14" />}
                  type="secondary"
                  shape="circle"
                  onClick={moveLeft}
                />
                <Button
                  className="swiper-nav-next"
                  size="large"
                  icon={<i className="icon icon-right font-14" />}
                  type="secondary"
                  shape="circle"
                  onClick={moveRight}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

PhotosModal.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default PhotosModal;
