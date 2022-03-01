import { isNil, isEmpty } from 'ramda';

export default data => !isNil(data) && !isEmpty(data);
