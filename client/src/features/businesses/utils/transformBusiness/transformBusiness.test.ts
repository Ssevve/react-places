import { generateMock } from '@anatine/zod-mock';
import camelize from 'camelize-ts';
import { yelpBusinessSchema } from '../../api';
import { transformBusiness } from './transformBusiness';

describe('transformBusinessesResponse', () => {
  it('should return correctly transformed data', () => {
    const mockBusiness = { ...generateMock(yelpBusinessSchema), price: '$' };
    const expectedData = camelize({ ...mockBusiness, displayIndex: 2, price: 1 });
    const newData = transformBusiness(mockBusiness, 1);
    expect(newData).toStrictEqual(expectedData);
  });

  it('should return correctly transformed data if price is not specified', () => {
    const mockBusiness = { ...generateMock(yelpBusinessSchema), price: '' };
    const expectedData = camelize({ ...mockBusiness, displayIndex: 2, price: 0 });
    const newData = transformBusiness(mockBusiness, 1);
    expect(newData).toStrictEqual(expectedData);
  });
});
