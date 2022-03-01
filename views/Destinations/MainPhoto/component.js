import React from 'react';

import isPresent from 'utils/isPresent';

import useContainer from './hook';

const MainPhoto = () => {
  const { url } = useContainer();

  if (!isPresent(url)) {
    return null;
  }

  return (
    <div className="search-page__results-img">
      <img src={url} alt="" />
    </div>
  );
};

export default MainPhoto;
