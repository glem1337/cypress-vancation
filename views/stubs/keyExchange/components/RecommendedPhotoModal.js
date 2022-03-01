import Modal from 'views/stubs/shared/Modal';

const RecommendedPhotoModal = () => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Recommended photos
        </h2>
      </div>
      <div className="main-modal__body">
        <p className="mb-16 in-black">
          •
          {' '}
          Front of vehicle
        </p>
        <p className="mb-16 in-black">
          •
          {' '}
          Rear of vehicle
        </p>
        <p className="mb-16 in-black">
          •
          {' '}
          Sides of vehicle
        </p>
        <p className="mb-16 in-black">
          •
          {' '}
          Corners of vehicle
        </p>
        <p className="mb-16 in-black">
          •
          {' '}
          Dashboard
        </p>
        <p className="mb-16 in-black">
          •
          {' '}
          Tank levels (fuel, water, batteries, etc.)
        </p>
        <p className="mb-16 in-black">
          •
          {' '}
          Odometer
        </p>
        <p className="mb-16 in-black">
          •
          {' '}
          Bed(s) and bedroom area
        </p>
        <p className="mb-16 in-black">
          •
          {' '}
          Interior living spaces
        </p>
        <p className="in-black">
          •
          {' '}
          Seating
        </p>
      </div>
    </div>
  </Modal>
);

export default RecommendedPhotoModal;
