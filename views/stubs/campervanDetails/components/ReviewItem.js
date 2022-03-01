import moment from 'moment';
import { Avatar, Button, Comment } from 'antd';

const ReviewItem = () => (
  <Comment
    className="report-comment"
    actions={[
      <>
        <span className="in-blue-1000" key="comment-nested-reply-to">
          <i className="icon icon-like-f mr-8" />
          Helpful - 2
        </span>
        <span className="ant-comment-report" key="comment-report-reply-to">
          <i className="icon icon-flag mr-8 in-gray-500" />
          Report
        </span>
      </>,
    ]}
    author={(
      <>
        <span className="profile-user-card__photo-rating-icon">
          <img src="/images/Like - White.svg" alt="" />
        </span>
        <span className="d-flex flex-wrap align-items-center text-body">
          <a href="" className="main-link mr-4 in-black font-600">
            Bruce H.
          </a>
          <span className="mr-4 in-black">
            recommends the listing:
          </span>
          <span className="ml-md-4 in-gray-700">
            •
            {' '}
            {moment().format('MMM DD YYYY')}
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
        <p className="profile-review__txt">
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure).
        </p>
        <Button
          size="small"
          className="mt-4 p-0 h-auto"
          type="simple-text"
        >
          Read more
        </Button>
        <div className="small-images-wrap">
          <div className="small-images__item">
            <img src="https://bit.ly/3iGoHBI" alt="" />
          </div>
          <div className="small-images__item">
            <img src="https://bit.ly/3vkZn6V" alt="" />
          </div>
          <div className="small-images__item">
            +3
          </div>
        </div>
      </div>
    )}
  />
);

export default ReviewItem;
