import unBlockDatesPopoverContent from '../unBlockDatesPopoverContent';

it('unBlockDatesPopoverContent helper', () => {
  const result = unBlockDatesPopoverContent({
    unBlockReject: jest.fn(),
    unBlockConfirm: jest.fn(),
  });

  expect(result).toMatchSnapshot();
});
