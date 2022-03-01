import React from 'react';
import {
  Image, Button,
} from 'antd';
import Dropdown from '../../shared/dropdowns/Dropdown';

const Gallery = () => (
  <div id="details-photos" className="van-details__images">
    <Image.PreviewGroup>
      <div className="van-details__big-img img-scale-hover">
        <Image preview={false} src="https://source.unsplash.com/random/1600x900" alt="" />
      </div>
      <div className="van-details__small-imgs">
        <div className="van-details__small-img img-scale-hover">
          <Image preview={false} src="https://source.unsplash.com/user/erondu" alt="" />
        </div>
        <div className="van-details__small-img img-scale-hover">
          <Image preview={false} src="https://source.unsplash.com/random" alt="" />
        </div>
        <div className="van-details__small-img img-scale-hover">
          <Image preview={false} src="https://source.unsplash.com/user/erondu" alt="" />
        </div>
        <div className="van-details__small-img img-scale-hover">
          <Image preview={false} src="https://source.unsplash.com/random" alt="" />
        </div>
      </div>
    </Image.PreviewGroup>
    <div className="van-details__images-more">
      <p>+12</p>
      <p>photos</p>
    </div>
    <div className="van-details__images-actions">
      {/* replace icon-heart to 'icon-heart-f in-red-1000' if favorite */}
      <Button
        type="text"
        className="mr-16"
        icon={<i className="icon icon-heart font-20" />}
      >
        Save
      </Button>
      <Dropdown
        className="mr-24"
        icon={(
          <Button
            type="text"
            className="mr-16"
            icon={<i className="icon icon-share font-20" />}
          >
            Share
          </Button>
        )}
        placement="bottomRight"
        overlayClassName="share-wrap"
      >
        <div className="main-dropdown-wrap">
          <div className="main-dropdown__body">
            <p className="text-title">
              Share this listing
            </p>
            <div className="share-wrap__inner">
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
            </div>
            <Button
              type="secondary"
              className="w-100 mt-8"
              icon={(<i className="icon icon-Link" />)}
              size="large"
            >
              Copy share link
            </Button>
          </div>
        </div>
      </Dropdown>
    </div>
  </div>
);

export default Gallery;
