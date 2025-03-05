import { useState } from 'react';

export const useCollapse = (): [boolean, () => void] => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(prevState => !prevState);
  };

  return [collapsed, toggleCollapse];
};
