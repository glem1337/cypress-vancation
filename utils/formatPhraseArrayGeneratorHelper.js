import * as R from 'ramda';
import { v4 as uuid } from 'uuid';

const formatPhraseArrayGeneratorHelper = ({ phrase, tagName } = {}) => {
  // Find <tagName> tags
  const tagRegexp = new RegExp(`<\\s*${tagName}[^>]*>(.*?)<\\s*\\s*${tagName}>`, 'g');
  const replaceRegexp = new RegExp(`<${tagName}>`, 'g');
  let result;
  let arrayPhrases = [];
  // eslint-disable-next-line no-cond-assign
  while (result = tagRegexp.exec(phrase)) {
    arrayPhrases = R.append(R.head(result), arrayPhrases);
  }
  arrayPhrases = R.map(item => R.replace(replaceRegexp, '', item), arrayPhrases);
  // Split phrase by <tagName> tag.
  const splittedPhrase = R.split(`<${tagName}>`, phrase);
  // Find color element.
  return splittedPhrase.map(item => {
    const state = arrayPhrases.some(element => element === item);

    return {
      id: uuid(),
      content: item,
      state,
    };
  });
};
export default formatPhraseArrayGeneratorHelper;
