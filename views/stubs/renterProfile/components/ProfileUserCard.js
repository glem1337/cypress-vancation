import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row, Avatar, Tooltip, Button,
} from 'antd';
import MainBtnGradient from '../../shared/buttons/MainBtnGradient';

const ProfileUserCard = ({ userName, btnTxt, txtTitle }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="profile-user-card">
      <Row gutter={24}>
        <Col md={8} lg={24}>
          <div className="profile-user-card__photo">
            <Avatar
              size={120}
              src="https://randomuser.me/api/portraits/women/87.jpg"
            />
            <Tooltip
              title={<span>Approved</span>}
            >
              <div className="profile-user-card__photo-approve">
                <i className="icon icon-activate-f font-16" />
              </div>
            </Tooltip>
            <div className="profile-user-card__photo-rating">
              <div className="profile-user-card__photo-rating-icon">
                <img src="/images/Like - White.svg" alt="" />
              </div>
              <span className="in-green-300 font-600">98%</span>
            </div>
          </div>
        </Col>
        <Col md={16} lg={24}>
          <div className="profile-user-card__info-card">
            <div className="mb-8 text-title">
              {userName}
            </div>
            <p className="mb-16 in-gray-700 text-caption">
              Member since November 2020
            </p>
            <MainBtnGradient
              className="mb-24"
              text={btnTxt}
              size="small"
            />
          </div>
          <div className="mb-8 in-black font-600">
            About me
          </div>
          <div className={`profile-user-card__txt ${showMore ? 'expand-txt--open' : ''}`}>
            {txtTitle && (
              <div className="mb-8 text-subtitle">
                {txtTitle}
              </div>
            )}
            Hi there, My name is Rodney Harmon, and I work in the
            film industry. I love the outdoors, spending time with my family…
            Hi there, My name is Rodney Harmon, and I work in the
            film industry. I love the outdoors, spending time with my family…
          </div>
          {/* eslint-disable-next-line react/button-has-type */}
          <Button
            className="mt-4"
            type="simple-text"
            onClick={() => setShowMore(!showMore)}
          >
            {
              showMore ? 'Show less' : 'Show more'
            }
          </Button>
        </Col>
      </Row>
    </div>
  );
};

ProfileUserCard.defaultProps = {
  txtTitle: '',
};

ProfileUserCard.propTypes = {
  userName: PropTypes.string.isRequired,
  btnTxt: PropTypes.string.isRequired,
  txtTitle: PropTypes.string,
};

export default ProfileUserCard;
