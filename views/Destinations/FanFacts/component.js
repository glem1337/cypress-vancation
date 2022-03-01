import React from 'react';
import { Divider } from 'antd';
import { defaultTo } from 'ramda';

import isPresent from 'utils/isPresent';

import Fact from './Fact';
import InnerHtmlField from '../InnerHtmlField';

import useContainer from './hook';

const FanFacts = () => {
  const {
    areCampersExist,
    description,
    facts,
  } = useContainer();

  if (areCampersExist || !isPresent(description) || !isPresent(facts)) {
    return null;
  }

  return (
    <>
      <Divider className="mt-24 mb-24" />
      <h2 className="text-headline mb-24">{description}</h2>
      {defaultTo([], facts).map(item => (
        <Fact
          className="mb-24"
          key={item.id}
        >
          <InnerHtmlField html={item.text} />
        </Fact>
      ))}
    </>
  );
};

export default FanFacts;
