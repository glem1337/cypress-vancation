import PropTypes from 'prop-types';
import classNames from 'classnames';
import { path, isNil } from 'ramda';

import userInitials from 'utils/users/initials';

const AvatarComponent = ({
  avatarClassName,
  sizeClassName,
  user,
  imageSize,
}) => {
  const avatar = path(['avatarUrls', imageSize], user);
  const initials = userInitials(user);
  const avatarClassNames = classNames(avatarClassName, 'main-userpic', sizeClassName, {
    'main-userpic--initials': !avatar,
    'd-flex justify-content-center align-items-center relative': !avatar,
  });

  if (!isNil(avatar)) {
    return <div className={avatarClassNames} style={{ backgroundImage: `url(${avatar})` }} />;
  }

  return (
    <div className={avatarClassNames}>
      <p className="main-userpic__initials">{initials}</p>
    </div>
  );
};

AvatarComponent.defaultProps = {
  avatarClassName: null,
  sizeClassName: null,
  imageSize: 'original',
};

AvatarComponent.propTypes = {
  user: PropTypes.shape().isRequired,
  avatarClassName: PropTypes.string,
  sizeClassName: PropTypes.string,
  imageSize: PropTypes.string,
};

export default AvatarComponent;
