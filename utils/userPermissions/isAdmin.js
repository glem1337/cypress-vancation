import { propEq } from 'ramda';

export default user => user && propEq('roleName', 'administrator', user);
