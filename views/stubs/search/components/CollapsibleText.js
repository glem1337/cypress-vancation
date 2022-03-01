/* eslint-disable react/prop-types */
import { useState } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';

const CollapsibleText = ({ className, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={classNames('search-page__collapsible', className)}>
      <div
        className={classNames(
          'search-page__collapsible-text',
          !collapsed && 'search-page__collapsible-text--open',
        )}
      >
        {children}
      </div>
      <Button type="simple-text" className="ant-btn-flat mt-4" onClick={() => setCollapsed(prev => !prev)}>
        {collapsed ? 'Show more' : 'Show less'}
      </Button>
    </div>
  );
};

export default CollapsibleText;
