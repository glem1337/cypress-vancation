import { useState } from 'react';

import MainBtnGradient from '../../shared/buttons/MainBtnGradient';
import TripDetails from './TripDetails';

const StickyCardBottom = () => {
  const [open, setOpen] = useState(false);

  // Toggle .scroll-hidden class when open TripDetails
  const openHandler = (isOpen) => {
    const { body } = document;
    body.classList.toggle('scroll-hidden', isOpen);
    setOpen(isOpen);
  };

  return (
    <>
      <div className="van-details__sticky-card-sticky">
        <div className="d-flex align-items-center">
          <i className="icon icon-flash-f mr-8 in-yellow-1000" />
          <p className="text-title">
            $375
            <span className="font-12 font-400">/ night</span>
          </p>
        </div>
        <MainBtnGradient
          size="large"
          className="min-w-140"
          text="Instant book"
          onClick={() => openHandler(true)}
        />
      </div>
      <TripDetails open={open} openHandler={() => openHandler(false)} />
    </>
  );
};

export default StickyCardBottom;
