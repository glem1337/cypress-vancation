import sleep from '../sleep';

describe('checks `sleep` helper', () => {
  it('checks `sleep` method resolves after default 400ms timeout', async () => {
    expect(await sleep()).toEqual(400);
  });

  it('checks `sleep` method resolves after 1000ms', async () => {
    expect(await sleep(1000)).toEqual(1000);
  });
});
