import React from 'react';
import classNames from 'classnames';

import isPresent from 'utils/isPresent';

import InnerHtmlField from '../InnerHtmlField';

import useContainer from './hook';

const MainInfo = () => {
  const { title, subTitle } = useContainer();

  return (
    <>
      <h1 className={classNames('text-headline', { 'd-none': !isPresent(title) })}>
        <InnerHtmlField html={title} />
      </h1>
      <p className={classNames('search-page__subtitle-info', { 'd-none': !isPresent(subTitle) })}>
        <InnerHtmlField html={subTitle} />
      </p>
    </>
  );
};

export default MainInfo;
