import { useState } from 'react';
import { Comment, Avatar, Button } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

const CommentComponent = ({ withReply, children, withImgs }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <Comment
      actions={[
        withReply && (
          <span className="in-blue-1000" key="comment-nested-reply-to">
            <i className="icon icon-reply-f mr-8" />
            Reply
          </span>
        ),
      ]}
      author={(
        <>
          <span className="profile-user-card__photo-rating-icon">
            <img src="/images/Like - White.svg" alt="" />
          </span>
          <span className="text-body">
            <a href="" className="main-link mr-4 in-black font-600">
              Bruce H.
            </a>
            <span className="mr-4 in-black">
              recommends the listing:
            </span>
            <span className="ant-comment__listing-name">
              Adventure Ready Class B Camper: 2020 Mercedes…
            </span>
            <span className="ml-md-4 in-gray-700">
              •
              {' '}
              { moment().format('MMM DD YYYY') }
            </span>
          </span>
        </>
      )}
      avatar={(
        <a href="">
          <Avatar
            src="https://randomuser.me/api/portraits/women/87.jpg"
            alt="Han Solo"
            size={64}
          />
        </a>
      )}
      content={(
        <div>
          <p className={`profile-review__txt ${readMore ? 'expand-txt--open' : ''}`}>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure).
          </p>
          <Button
            className="mt-4 h-auto p-0"
            type="simple-text"
            onClick={() => setReadMore(!readMore)}
          >
            {
              readMore ? 'Read less' : 'Read more'
            }
          </Button>
          {withImgs && (
            <div className="small-images-wrap">
              <div className="small-images__item">
                <img src="https://bit.ly/3iGoHBI" alt="" />
              </div>
              <div className="small-images__item">
                <img src="https://bit.ly/3iGoHBI" alt="" />
              </div>
              <div className="small-images__item">
                +3
              </div>
            </div>
          )}
        </div>
      )}
    >
      {children}
    </Comment>
  );
};

/* eslint-disable import/prefer-default-export */
export const CommentTab = () => (
  <div>
    <CommentComponent withImgs />
    <CommentComponent withReply={false}>
      <CommentComponent withReply={false} />
    </CommentComponent>
  </div>
);

CommentComponent.defaultProps = {
  children: null,
  withReply: true,
  withImgs: false,
};

CommentComponent.propTypes = {
  children: PropTypes.shape(),
  withReply: PropTypes.bool,
  withImgs: PropTypes.bool,
};
