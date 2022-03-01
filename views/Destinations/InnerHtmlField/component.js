import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { defaultTo, isNil } from 'ramda';

const InnerHtmlField = ({ html, WrapperTag }) => {
  if (isNil(html)) {
    return null;
  }

  const replaced = defaultTo('', html).replace(/(<[^>]+) style=".*?"/ig, '$1');

  return (
    // eslint-disable-next-line react/no-danger
    <WrapperTag dangerouslySetInnerHTML={{ __html: replaced }} key={uuid()} />
);
};

InnerHtmlField.propTypes = {
  html: PropTypes.string,
  WrapperTag: PropTypes.string,
};

InnerHtmlField.defaultProps = {
  html: undefined,
  WrapperTag: 'span',
};

export default InnerHtmlField;
