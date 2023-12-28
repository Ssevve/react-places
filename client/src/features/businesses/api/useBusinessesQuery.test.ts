import { mockYelpBusinessesResponse } from '@/__mocks__';
import { env } from '@/config/env';
import { createQueryHookWrapper } from '@/tests/createQueryHookWrapper';
import { renderHook, waitFor } from '@/tests/utils';
import { transformBusinessesResponse } from '../utils';
import { UseBusinessesQueryProps, useBusinessesQuery } from './useBusinessesQuery';

const testPage = 2;
const testCity = 'Warsaw';
const testBusinessesPerPage = 10;

const renderUseBusinessesQuery = (props?: Partial<UseBusinessesQueryProps>) => {
  return renderHook(
    () =>
      useBusinessesQuery({
        businessesPerPage: testBusinessesPerPage,
        city: testCity,
        page: testPage,
        ...props,
      }),
    {
      wrapper: createQueryHookWrapper,
    },
  );
};

describe('useBusinessesQuery', () => {
  it('should return correctly transformed data on success', async () => {
    const expectedData = transformBusinessesResponse({
      businessesPerPage: testBusinessesPerPage,
      data: mockYelpBusinessesResponse,
      page: testPage,
    });

    const { result } = renderUseBusinessesQuery();
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toStrictEqual(expectedData);
  });

  it('should call an API with correct parameters', () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    renderUseBusinessesQuery({
      businessesPerPage: testBusinessesPerPage,
      city: testCity,
      page: testPage,
    });
    expect(fetchSpy).toHaveBeenCalledWith(
      `${env.VITE_BUSINESSES_API_URL}?page=${testPage}&limit=${testBusinessesPerPage}&city=${testCity}`,
    );
  });
});
