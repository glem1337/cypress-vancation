import { Button } from 'antd';
import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import Modal from 'views/stubs/shared/Modal';

const IDVerificationModal = () => (
  <Modal className="main-modal main-modal--big" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__body">
        <img
          className="mb-md-24"
          src="/images/listing/Success.svg"
          alt=""
        />
        <div className="mb-16 text-headline font-700">
          Congrats! Your listing is now being reviewed.
        </div>
        <p className="mb-16">
          The listing will automatically be published on Vancation after
          moderation is completed. Go to your owner dashboard to add additional
          details or sync your rental calendar with other rental sites.
        </p>
        <p className="mb-48 mb-md-24">
          Vancation cares about our network trust and safety. We strongly
          recommend verifying your ID now to improve your rankings as a host
          on the platform. Hosts with a verified ID receive a verified badge,
          achieve 31% more bookings and increase their position in search results!
        </p>
        <div className="d-flex align-items-center justify-content-center">
          <MainBtnGradient
            text="Verify my License"
            className="min-w-140 mr-16"
            size="large"
          />
          <Button size="large" type="link">
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  </Modal>
);

export default IDVerificationModal;
