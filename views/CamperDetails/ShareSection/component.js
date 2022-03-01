import React from 'react';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';

import Dropdown from 'views/shared/Dropdown';

import useContainer from './hook';

const ShareSection = () => {
  const {
    isDropDownVisible,
    toggleDropdownVisibility,
    sharedEmailData,
    isUrlCopied,
    copyUrlToClipBoard,
    sharedSocialData,
  } = useContainer();

  return (
    <div className="van-details__images-actions van-details__images-actions-extended">
      {/* replace icon-heart to 'icon-heart-f in-red-1000' if favorite */}
      <Button
        type="text"
        className="mr-16 d-none"
        icon={<i className="icon icon-heart font-20" />}
      >
        <FormattedMessage id="shared.save" />
      </Button>
      <Dropdown
        className="mr-24"
        visible={isDropDownVisible}
        icon={(
          <Button
            type="text"
            className="mr-16"
            icon={<i className="icon icon-share font-20" />}
            onClick={toggleDropdownVisibility}
          >
            <FormattedMessage id="shared.share" />
          </Button>
        )}
        placement="bottomRight"
        overlayClassName="share-section__dropdown main-dropdown share-wrap"
      >
        <div className="main-dropdown-wrap">
          <div className="main-dropdown__body">
            <p className="text-title">
              <FormattedMessage id="shared.shareThisListing" />
            </p>
            <div className="share-wrap__inner">
              <FacebookShareButton
                url={sharedSocialData.url}
              >
                <span className="share-item">
                  <span className="share-icon-wrap share-icon-wrap--facebook"><i className="icon icon-facebook" /></span>
                  Facebook
                </span>
              </FacebookShareButton>
              <TwitterShareButton url={sharedSocialData.url}>
                <span className="share-item">
                  <span className="share-icon-wrap share-icon-wrap--twitter"><i className="icon icon-twitter" /></span>
                  Twitter
                </span>
              </TwitterShareButton>
              <PinterestShareButton
                url={sharedSocialData.url}
                media={sharedSocialData.mainPhoto}
              >
                <span className="share-item">
                  <span className="share-icon-wrap share-icon-wrap--pinterest"><i className="icon icon-pinterest" /></span>
                  Pinterest
                </span>
              </PinterestShareButton>
              <LinkedinShareButton url={sharedSocialData.url}>
                <span className="share-item">
                  <span className="share-icon-wrap share-icon-wrap--linkedin"><i className="icon icon-linkedin" /></span>
                  Linkedin
                </span>
              </LinkedinShareButton>
              <EmailShareButton
                url={sharedEmailData.url}
                subject={sharedEmailData.subject}
              >
                <span className="share-item">
                  <span className="share-icon-wrap share-icon-wrap--email"><i className="icon icon-email-f" /></span>
                  <FormattedMessage id="shared.email" />
                </span>
              </EmailShareButton>
            </div>
            <Button
              type="secondary"
              className="w-100 mt-8"
              icon={(<i className="icon icon-Link" />)}
              size="large"
              onClick={copyUrlToClipBoard}
            >
              <span className="copy-link">
                {isUrlCopied
                  ? <FormattedMessage id="shared.copyShareLinkCopied" />
                  : <FormattedMessage id="shared.copyShareLink" />}
              </span>
            </Button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default ShareSection;
