import camelize from 'camelize-ts';
import { YelpBusinessesResponse } from '../types';
import { transformBusiness } from './transformBusiness';

interface TransformBusinessesResponseProps {
  data: YelpBusinessesResponse;
  businessesPerPage: number;
  page: number;
}

export const transformBusinessesResponse = ({
  data,
  businessesPerPage,
  page,
}: TransformBusinessesResponseProps) => {
  const modifiedBusinesses = data.businesses.map((business, index) =>
    transformBusiness({ business, businessesPerPage, index, page }),
  );

  return camelize({ ...data, businesses: modifiedBusinesses });
};
