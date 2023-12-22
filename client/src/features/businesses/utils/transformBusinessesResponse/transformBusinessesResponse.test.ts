import { mockYelpBusinessesResponse } from '@/__mocks__';
import { transformBusinessesResponse } from './transformBusinessesResponse';
import { transformBusiness } from '../transformBusiness';

describe('transformBusinessesResponse', () => {
  it('should return correctly transformed data', () => {
    const expectedPage = 1;
    const expectedBusinessesPerPage = 25;
    const expectedBusinesses = mockYelpBusinessesResponse.businesses.map((business, index) =>
      transformBusiness({
        business,
        businessesPerPage: expectedBusinessesPerPage,
        index,
        page: expectedPage,
      }),
    );
    const expectedData = { ...mockYelpBusinessesResponse, businesses: expectedBusinesses };
    const newData = transformBusinessesResponse({
      businessesPerPage: expectedBusinessesPerPage,
      data: mockYelpBusinessesResponse,
      page: expectedPage,
    });
    expect(newData).toStrictEqual(expectedData);
  });
});
