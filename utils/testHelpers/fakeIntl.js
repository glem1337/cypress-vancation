import { is } from 'ramda';

const formatMessage = ({ id, values }) => {
  let valuesPart = '';
  if (values) {
    valuesPart = ', values: {';
    valuesPart = Object.entries(values).reduce(
      (result, entry) => `${result} ${entry[0]}: ${is(String)(entry[1]) ? `'${entry[1]}'` : entry[1]},`,
      valuesPart,
    );
    valuesPart = `${valuesPart.slice(0, -1)} }`;
  }
  return `{Translation id: ${id}${valuesPart}}`;
};

const fakeIntl = {
  formatMessage,
};

export default fakeIntl;
