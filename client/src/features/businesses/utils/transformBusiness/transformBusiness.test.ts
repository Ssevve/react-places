import { generateMock } from '@anatine/zod-mock';
import camelize from 'camelize-ts';
import { yelpBusinessSchema } from '../../api';
import { transformBusiness } from './transformBusiness';

const testBusinessesPerPage = 20;
const testPage = 1;

// TODO: update
describe('transformBusiness', () => {
  it('should return correctly transformed data', () => {
    const mockBusiness = { ...generateMock(yelpBusinessSchema), price: '$' };
    const expectedData = camelize({ ...mockBusiness, displayIndex: 2, price: 1 });
    const newData = transformBusiness({
      business: mockBusiness,
      businessesPerPage: testBusinessesPerPage,
      index: 1,
      page: testPage,
    });
    expect(newData).toStrictEqual(expectedData);
  });

  it('should return correctly transformed data if price is not specified', () => {
    const mockBusiness = { ...generateMock(yelpBusinessSchema), price: '' };
    const expectedData = camelize({ ...mockBusiness, displayIndex: 2, price: 0 });
    const newData = transformBusiness({
      business: mockBusiness,
      businessesPerPage: testBusinessesPerPage,
      index: 1,
      page: testPage,
    });
    expect(newData).toStrictEqual(expectedData);
  });
});
