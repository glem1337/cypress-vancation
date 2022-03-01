import { Divider } from 'antd';

import isPresent from 'utils/isPresent';
import InnerHtmlField from '../InnerHtmlField';

import useContainer from './hook';

const Description = () => {
  const { areCampersExist, description } = useContainer();

  if (areCampersExist || !isPresent(description)) {
    return null;
  }

  return (
    <>
      <InnerHtmlField html={description} />
      {areCampersExist && (
        <Divider className="mt-24 mb-24" />
      )}
    </>
  );
};

export default Description;
