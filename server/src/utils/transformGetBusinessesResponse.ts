import { Business, GetBusinessesResponse } from '../schemas/getBusinessesResponseSchema';

interface TransformBusinessArgs {
  business: Business;
  index: number;
  businessesPerPage: number;
  page: number;
}

function transformBusiness({ business, index, businessesPerPage, page }: TransformBusinessArgs) {
  return {
    categories: business.categories.map(({ title }) => title),
    coordinates: business.coordinates,
    id: business.id,
    isClosed: business.is_closed,
    displayAddress: business.location.display_address.join(', '),
    name: business.name,
    rating: business.rating,
    reviewCount: business.review_count,
    displayPhone: business.display_phone || null,
    imageUrl: business.image_url || null,
    price: business.price?.length || 0,
    yelpUrl: business.url || null,
    displayIndex: index + businessesPerPage * (page - 1) + 1,
  };
}

interface TransformBusinessesResponseArgs {
  data: GetBusinessesResponse;
  businessesPerPage: number;
  page: number;
}

export function transformGetBusinessesResponse({
  data,
  businessesPerPage,
  page,
}: TransformBusinessesResponseArgs) {
  const modifiedBusinesses = data.businesses.map((business, index) =>
    transformBusiness({ business, businessesPerPage, index, page }),
  );

  return {
    businesses: modifiedBusinesses,
    totalBusinesses: data.total,
    cityCenter: data.region.center,
  };
}
