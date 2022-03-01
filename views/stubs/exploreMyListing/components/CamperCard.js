import { notification } from 'antd';
import PropTypes from 'prop-types';
import Dropdown from '../../shared/dropdowns/Dropdown';

const openNotificationUnpublish = type => {
  notification[type]({
    message: 'Camper has been unpublished',
    duration: 0,
    className: 'notification--success',
    icon: <i className="icon icon-checked in-green-1000" />,
    getContainer: () => document.getElementById('main-account-wrap-master'),
  });
};
const openNotificationPublish = type => {
  notification[type]({
    message: 'Camper has been published',
    duration: 0,
    className: 'notification--success',
    icon: <i className="icon icon-checked in-green-1000" />,
    getContainer: () => document.getElementById('main-account-wrap-master'),
  });
};
const openNotificationRemove = type => {
  notification[type]({
    message: 'Camper has been removed',
    duration: 0,
    className: 'notification--success',
    icon: <i className="icon icon-checked in-green-1000" />,
    getContainer: () => document.getElementById('main-account-wrap-master'),
  });
};

const CardDropdown = (
  <Dropdown
    icon={(<i className="icon icon-overflow in-gray-500 c-pointer" />)}
    placement="bottomRight"
    overlayClassName="min-w-180"
  >
    <div className="main-dropdown-wrap">
      <div className="main-dropdown__body">
        <div
          role="button"
          onClick={() => openNotificationPublish('success')}
          className="main-dropdown__item in-black c-pointer"
        >
          <i className="icon icon-publish in-gray-500 mr-8" />
          Publish
        </div>
        <div
          role="button"
          onClick={() => openNotificationUnpublish('success')}
          className="main-dropdown__item in-black c-pointer"
        >
          <i className="icon icon-unpublish in-gray-500 mr-8" />
          Unpublish
        </div>
        <div className="main-dropdown__item in-black c-pointer">
          <i className="icon icon-eye in-gray-500 mr-8" />
          Preview
        </div>
        <div
          role="button"
          onClick={() => openNotificationRemove('success')}
          className="main-dropdown__item in-black c-pointer"
        >
          <i className="icon icon-delete in-gray-500 mr-8" />
          Remove
        </div>
      </div>
    </div>
  </Dropdown>
);

const CamperCard = ({ status, withInsurance }) => (
  <div className="master-view-card">
    <div className="master-view-card__header">
      <div className="d-flex align-items-center flex-wrap">
        <p className="mr-16 text-color-gray">
          ID: 2047639
        </p>
        <div className="d-flex align-items-center mr-16">
          <span className="mr-4 in-black">
            Status:
          </span>
          { status }
        </div>
        <div className="d-flex align-items-center mt-16 mt-md-0">
          <span className="mr-8 in-black">
            Insurance:
          </span>
          <p className="in-black">
            <i className="icon icon-checked mr-8 in-green-1000" />
            Approved
          </p>
        </div>
      </div>
      <div className="mr-8 ml-auto">
        { CardDropdown }
      </div>
    </div>
    <div className="d-flex align-items-center">
      <div className="master-view-card__img">
        <img src="https://bit.ly/3pOo9uQ" alt="" />
      </div>
      <div className="master-view-card__info">
        {/* Truncate text */}
        <div className="master-view-card__info-title">
          Adventure Ready Class B Camper: 2020 Mercedes Sprinter…
        </div>
        {/* Truncate text */}
        <p className="master-view-card__info-txt">
          Glamper van in Los Angeles
        </p>
        {/* Truncate text */}
        <p className="master-view-card__info-txt">
          Mercedes Sprinter Winnebago Revel 4x4
        </p>
        <div className="master-view-card__info-percent">
          <span className="master-view-card__info-percent-numb">
            <img src="/images/listing/Like-Green.svg" alt="" />
            95%
          </span>
          <span className="master-view-card__info-percent-count">
            (26)
          </span>
        </div>
      </div>
    </div>
    <div className="master-view-card__id">
      <p>
        2047639
      </p>
    </div>
    <div className="master-view-card__status">
      { status }
    </div>
    <div className="master-view-card__insurance">
      {withInsurance && (
        <p className="in-black">
          <i className="icon icon-checked mr-8 in-green-1000" />
          Approved
        </p>
      )}
    </div>
    <div className="master-view-card__options">
      { CardDropdown }
    </div>
  </div>
);

CamperCard.defaultProps = {
  withInsurance: false,
};

CamperCard.propTypes = {
  status: PropTypes.shape().isRequired,
  withInsurance: PropTypes.bool,
};

export default CamperCard;
