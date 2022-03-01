import { Button } from 'antd';
import Modal from '../../shared/Modal';

const ShareListingMobile = () => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Share this listing
        </h2>
      </div>
      <div className="main-modal__body">
        <a href="" className="share-item">
          <span className="share-icon-wrap share-icon-wrap--facebook"><i className="icon icon-facebook" /></span>
          Facebook
        </a>
        <a href="" className="share-item">
          <span className="share-icon-wrap share-icon-wrap--twitter"><i className="icon icon-twitter" /></span>
          Twitter
        </a>
        <a href="" className="share-item">
          <span className="share-icon-wrap share-icon-wrap--instagram"><i className="icon icon-instagram" /></span>
          Instagram
        </a>
        <a href="" className="share-item">
          <span className="share-icon-wrap share-icon-wrap--pinterest"><i className="icon icon-pinterest" /></span>
          Pinterest
        </a>
        <a href="" className="share-item">
          <span className="share-icon-wrap share-icon-wrap--linkedin"><i className="icon icon-linkedin" /></span>
          Linkedin
        </a>
        <a href="" className="share-item">
          <span className="share-icon-wrap share-icon-wrap--email"><i className="icon icon-email-f" /></span>
          Email
        </a>
        <Button
          type="secondary"
          className="main-btn--sm-100 mt-8"
          icon={(<i className="icon icon-Link" />)}
          size="large"
        >
          Copy share link
        </Button>
      </div>
    </div>
  </Modal>
);

export default ShareListingMobile;
