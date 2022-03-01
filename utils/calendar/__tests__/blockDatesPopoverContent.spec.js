import blockDatesPopoverContent from '../blockDatesPopoverContent';

it('blockDatesPopoverContent helper', () => {
  const result = blockDatesPopoverContent({
    blockReject: jest.fn(),
    blockConfirm: jest.fn(),
  });

  expect(result).toMatchSnapshot();
});
