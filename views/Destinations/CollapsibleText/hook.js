import { useState } from 'react';

function useContainer() {
  const [collapsed, setCondition] = useState(true);

  /**
   * Change collapsed condition.
   */
  const setCollapsed = () => {
    setCondition(prev => !prev);
  };

  return {
    collapsed,
    setCollapsed,
  };
}

export default useContainer;
