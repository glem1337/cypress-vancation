const isMobileView = () => {
  let isMobile = false;

  try {
    const mobileDetector = document.querySelector('#mobile-detector');

    const display = getComputedStyle(mobileDetector)?.display;

    isMobile = display === 'flex';
  } catch (err) {
    isMobile = false;
  }

  return isMobile;
};

export default isMobileView;
