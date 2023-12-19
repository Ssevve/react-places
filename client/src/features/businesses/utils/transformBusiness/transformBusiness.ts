import camelize from 'camelize-ts';
import { YelpBusiness } from '../../types';

interface TransformBusinessProps {
  business: YelpBusiness;
  index: number;
  businessesPerPage: number;
  page: number;
}

export const transformBusiness = ({
  business,
  index,
  businessesPerPage,
  page,
}: TransformBusinessProps) => {
  return camelize({
    ...business,
    displayIndex: index + businessesPerPage * (page - 1) + 1,
    price: business.price?.length,
  });
};
