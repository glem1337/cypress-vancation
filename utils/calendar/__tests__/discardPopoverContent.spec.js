import discardPopoverContent from '../discardPopoverContent';

it('discardPopoverContent helper', () => {
  const result = discardPopoverContent({
    discardReject: jest.fn(),
    discardConfirm: jest.fn(),
  });

  expect(result).toMatchSnapshot();
});
