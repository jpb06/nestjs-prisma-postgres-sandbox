jest.mock('./bootstrap');

import { bootstrap } from './bootstrap';

describe('Main file', () => {
  it('should bootstrap', async () => {
    require('./main');

    expect(bootstrap).toHaveBeenCalledTimes(1);
  });
});
