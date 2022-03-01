import { Avatar, Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { MAX_DESCRIPTION_VISIBLE_SYMBOLS } from 'constants/camperDetails/owner';

import userInitials from 'utils/userInitials';
import isPresent from 'utils/isPresent';

import SkeletonText from 'views/shared/SkeletonText';
import BtnGradient from 'views/shared/BtnGradient';
import Rating from './Rating';

const OwnerProfile = ({
  initialized,
  onRef,
  isCamperExist,
  isLoading,
  toggleDescription,
  description,
  allDescriptionVisible,
  onAskQuestion,
  owner,
  fullName,
  ratingProps,
}) => {
  if (!isCamperExist || isLoading) {
    return (
      <div ref={onRef} className="mb-40 mb-md-60">
        <Row gutter={24} align="bottom">
          <Col md={16} xl={10} className="mb-24 mb-md-0">
            <div className="skeleton__title w-100" />
            <SkeletonText />
          </Col>
          <Col md={8} xl={{ span: 6, offset: 4 }}>
            <div className="skeleton__title w-100" />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div ref={onRef} className="mb-40 mb-md-60">
      {initialized && (
        <Row gutter={24} align="bottom">
          <Col md={16} xl={10} className="mb-24 mb-md-0">
            <div className="d-flex mb-16">
              <Avatar
                className="mr-16 flex-shrink-0"
                src={owner.avatarUrl}
                size={64}
                alt=""
              >
                {userInitials(...fullName)}
              </Avatar>
              <div>
                <div className="d-flex flex-wrap mb-8">
                  <p className="mr-4 text-headline font-700">
                    <FormattedMessage id="shared.ownedBy" />
                  </p>
                  <p className="text-headline in-blue-1000 font-700">
                    {owner.businessTitle || fullName.join(' ')}
                  </p>
                </div>
                <p className="">{owner.createdAt}</p>
              </div>
            </div>
            <div className="d-flex align-items-center flex-wrap mb-16">
              {isPresent(owner.averageRating) && (
                <Rating {...ratingProps} rating={owner.averageRating} />
              )}
              <p className="mr-16 text-subheader font-400 text-lowercase">
                <i className="icon icon-camper-f mr-8" />
                {owner.campersCount}
                {' '}
                <FormattedMessage id="shared.campers" />
              </p>
              {owner.idVerified && (
                <p className="mt-16 mt-md-0 text-subheader font-400">
                  <i className="icon icon-activate-f mr-8 in-azure-1000" />
                  <FormattedMessage id="shared.idVerified" />
                </p>
              )}
            </div>
            {isPresent(description) && (
              <p className="text-color-gray text-subheader font-400">
                {description}
              </p>
            )}
            {owner.description?.length > MAX_DESCRIPTION_VISIBLE_SYMBOLS && (
              <Button
                onClick={toggleDescription}
                className="mt-4 p-0 text-subheader font-400 h-auto"
                type="simple-text"
              >
                <FormattedMessage
                  id={allDescriptionVisible ? 'shared.hide' : 'shared.readMore'}
                />
              </Button>
            )}
          </Col>
          <Col md={8} xl={{ span: 6, offset: 4 }}>
            <BtnGradient
              onClick={onAskQuestion}
              size="large"
              className="min-w-180 main-btn--sm-100"
              text={{
                id: 'shared.askQuestion',
              }}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

OwnerProfile.defaultProps = {
  onRef: undefined,
  isLoading: false,
};

OwnerProfile.propTypes = {
  onRef: PropTypes.func,
  isLoading: PropTypes.bool,
  owner: PropTypes.shape().isRequired,
  initialized: PropTypes.bool.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  toggleDescription: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  fullName: PropTypes.arrayOf(PropTypes.string).isRequired,
  allDescriptionVisible: PropTypes.bool.isRequired,
  onAskQuestion: PropTypes.func.isRequired,
  ratingProps: PropTypes.shape().isRequired,
};

export default OwnerProfile;
