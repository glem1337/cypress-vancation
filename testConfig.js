/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter17 from '@wojtekmaj/enzyme-adapter-react-17';
import MockDate from 'mockdate';
import { format } from 'util';

const { error } = global.console;
/* eslint-disable no-console */
/* istanbul ignore next */global.console.error = (...args) => {
  error(...args);
  throw new Error(format(...args));
};
/* istanbul ignore next */console.warn = (warning) => { throw new Error(warning); };

export default configure({ adapter: new Adapter17() });
MockDate.set(new Date('2/20/2000'));
