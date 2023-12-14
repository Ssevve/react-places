import camelize from 'camelize-ts';
import { YelpBusiness } from '../../types';

export const transformBusiness = (business: YelpBusiness, index: number) => {
  return camelize({ ...business, displayIndex: index + 1, price: business.price?.length });
};
