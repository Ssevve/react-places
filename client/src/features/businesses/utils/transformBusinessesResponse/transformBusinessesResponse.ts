import camelize from 'camelize-ts';
import { YelpBusinessesResponse } from '../../types';
import { transformBusiness } from '../transformBusiness';

export const transformBusinessesResponse = (data: YelpBusinessesResponse) => {
  const modifiedBusinesses = data.businesses.map((business, index) =>
    transformBusiness(business, index),
  );

  return camelize({ ...data, businesses: modifiedBusinesses });
};
