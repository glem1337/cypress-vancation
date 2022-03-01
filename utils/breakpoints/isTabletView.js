const isTabletView = () => {
  let isTablet = false;

  try {
    const mobileDetector = document.querySelector('#tablet-detector');

    const display = getComputedStyle(mobileDetector)?.display;

    isTablet = display === 'flex';
  } catch (err) {
    isTablet = false;
  }

  return isTablet;
};

export default isTabletView;
