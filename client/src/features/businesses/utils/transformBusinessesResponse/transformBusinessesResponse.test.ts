import { mockYelpBusinessesResponse } from '@/__mocks__';
import { transformBusinessesResponse } from './transformBusinessesResponse';
import { transformBusiness } from '../transformBusiness';

describe('transformBusinessesResponse', () => {
  it('should return correctly transformed data', () => {
    const expectedBusinesses = mockYelpBusinessesResponse.businesses.map((business, index) =>
      transformBusiness(business, index),
    );
    const expectedData = { ...mockYelpBusinessesResponse, businesses: expectedBusinesses };
    const newData = transformBusinessesResponse(mockYelpBusinessesResponse);
    expect(newData).toStrictEqual(expectedData);
  });
});
