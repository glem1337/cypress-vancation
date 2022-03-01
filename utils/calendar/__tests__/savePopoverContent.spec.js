import savePopoverContent from '../savePopoverContent';

it('savePopoverContent helper', () => {
  const result = savePopoverContent({
    saveReject: jest.fn(),
    saveConfirm: jest.fn(),
    withWarning: true,
  });

  expect(result).toMatchSnapshot();
});
