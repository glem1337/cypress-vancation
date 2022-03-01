import { mergeWith } from 'lodash';
import { flatten, is } from 'ramda';

const updateDataHelper = (stateData, type, ids, data) => {
  const objects = {};
  flatten([ids]).forEach((id) => {
    objects[id] = mergeWith(
      {},
      stateData[type][id],
      { ...data },
      (objValue, srcValue) => (is(Array)(objValue) ? srcValue : undefined),
    );
  });

  return { [type]: objects };
};

export default updateDataHelper;
