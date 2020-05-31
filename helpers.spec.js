import { flickrApi } from './src/service/api';

describe('Test Public API from flickr', () => {
  let data;
  beforeEach(async () => {
    data = await flickrApi('public')
  });
  it('corrected format API', async () => {
    expect(data.title != undefined).toEqual(true);
    expect(data.items != undefined).toEqual(true);
    expect(data.items.length >= 1).toEqual(true);
  });
});