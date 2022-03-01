import PropTypes from 'prop-types';

const Logo = ({ bigLogoClassName, smallLogoClassName }) => {
  const bigLogoClassNames = `d-none d-md-block ${bigLogoClassName}`;
  const smallLogoClassNames = `d-md-none ${smallLogoClassName}`;

  return (
    <>
      <div className={bigLogoClassNames}>
        <img src="/images/logo/logo-colored.svg" alt="" />
      </div>
      <div className={smallLogoClassNames}>
        <img src="/images/logo/logo-hand.svg" alt="" />
      </div>
    </>
  );
};

Logo.defaultProps = {
  bigLogoClassName: '',
  smallLogoClassName: '',
};

Logo.propTypes = {
  bigLogoClassName: PropTypes.string,
  smallLogoClassName: PropTypes.string,
};

export default Logo;
