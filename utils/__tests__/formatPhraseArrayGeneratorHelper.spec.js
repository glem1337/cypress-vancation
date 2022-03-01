import formatPhraseArrayGeneratorHelper from '../formatPhraseArrayGeneratorHelper';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

describe('formatPhraseArrayGeneratorHelper', () => {
  it('phrase = string without tag color', () => {
    const phrase = 'test string';
    const dataPhrase = [
      { content: 'test string', state: false, id: 'uuid/v4' },
    ];

    expect(formatPhraseArrayGeneratorHelper({ phrase, tagName: 'color' }))
      .toEqual(dataPhrase);
  });

  it('phrase = string with tag color', () => {
    const phrase = 'test <color>string<color> test';
    const dataPhrase = [
      { content: 'test ', state: false, id: 'uuid/v4' },
      { content: 'string', state: true, id: 'uuid/v4' },
      { content: ' test', state: false, id: 'uuid/v4' },
    ];

    expect(formatPhraseArrayGeneratorHelper({ phrase, tagName: 'color' }))
      .toEqual(dataPhrase);
  });
});
