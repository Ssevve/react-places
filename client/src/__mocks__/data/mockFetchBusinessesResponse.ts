import { FetchBusinessesResponse } from '@/features/businesses';

export const mockFetchBusinessesResponse: FetchBusinessesResponse = {
  businesses: [
    {
      categories: ['Restaurants', 'Bars'],
      coordinates: {
        latitude: 48.3535964,
        longitude: 12.6469023,
      },
      displayAddress: 'Test address 1 / 3',
      displayIndex: 1,
      displayPhone: '+48 88 888 88 88',
      id: 'nnhonxbvEs5545bLeF9U6w',
      imageUrl: 'https://s3-meia3.fl.yelpcn.com/boto/qTbDhqoRR_CDjyF-oQ/o.jpg',
      isClosed: false,
      name: 'Test Business',
      price: 2,
      rating: 5,
      reviewCount: 44,
      yelpUrl: 'https://www.yelp.com/mock-business',
    },
    {
      categories: ['Bars', 'Polish'],
      coordinates: {
        latitude: 54.3484577959159,
        longitude: 18.6606614528088,
      },
      displayAddress: 'Test address 25 / 4',
      displayIndex: 2,
      displayPhone: '+48 99 999 99 99',
      id: 'EkelMxIDFj43NkwY-nsVug',
      imageUrl: 'https://s3-ia1.fl.dn.com/boto/Jvm9C_s9k7NfiZmCh5CA/o.jpg',
      isClosed: true,
      name: 'Test Bar',
      price: 3,
      rating: 4.5,
      reviewCount: 18,
      yelpUrl: 'https://www.yelp.com/biz/test-bar',
    },
  ],
  cityCenter: {
    latitude: 53.543,
    longitude: 42.333,
  },
  totalBusinesses: 2,
};
