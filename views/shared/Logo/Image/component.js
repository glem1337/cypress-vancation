import PropTypes from 'prop-types';

const Image = ({ bigLogoClassName, smallLogoClassName, isWhite }) => {
  const bigLogoClassNames = `d-none d-md-block ${bigLogoClassName}`;
  const smallLogoClassNames = `d-md-none ${smallLogoClassName}`;
  const suffixLogo = isWhite ? 'white' : 'colored';

  return (
    <>
      <div className={bigLogoClassNames}>
        <img src={`/images/logo/logo-${suffixLogo}.svg`} alt="" />
      </div>
      <div className={smallLogoClassNames}>
        <img src="/images/logo/logo-hand.svg" alt="" />
      </div>
    </>
  );
};

Image.defaultProps = {
  bigLogoClassName: '',
  smallLogoClassName: '',
  isWhite: false,
};

Image.propTypes = {
  bigLogoClassName: PropTypes.string,
  smallLogoClassName: PropTypes.string,
  isWhite: PropTypes.bool,
};

export default Image;
