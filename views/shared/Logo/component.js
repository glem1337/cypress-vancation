import PropTypes from 'prop-types';
import Link from 'next/link';

import ROUTES from 'constants/routes';

import Image from './Image';

const Logo = ({
  isLink,
  ...props
}) => (
  <>
    {
      isLink ? (
        <Link href={ROUTES.INDEX.PATH}>
          <a>
            <Image {...props} />
          </a>
        </Link>
      ) : (
        <Image {...props} />
      )
    }
  </>
);

Logo.defaultProps = {
  bigLogoClassName: '',
  smallLogoClassName: '',
  isLink: false,
  isWhite: false,
};

Logo.propTypes = {
  bigLogoClassName: PropTypes.string,
  smallLogoClassName: PropTypes.string,
  isLink: PropTypes.bool,
  isWhite: PropTypes.bool,
};

export default Logo;
