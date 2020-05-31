import { flickrApi } from './src/service/api';

describe('Test Public API from flickr', () => {
  let data;
  beforeEach(async () => {    
    data = await flickrApi('public')
  });
  it('corrected format API', async () => {
    expect(data.items.length >= 1).toEqual(true);
  });
});