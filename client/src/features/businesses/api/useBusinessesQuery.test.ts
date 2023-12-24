import { mockYelpBusinessesResponse } from '@/__mocks__';
import { env } from '@/config/env';
import { createQueryHookWrapper } from '@/tests/createQueryHookWrapper';
import { renderHook, waitFor } from '@/tests/utils';
import { businessesPerPage } from '../constants';
import { transformBusinessesResponse } from '../utils';
import { UseBusinessesQueryProps, useBusinessesQuery } from './useBusinessesQuery';

const renderUseBusinessesQuery = (props?: Partial<UseBusinessesQueryProps>) => {
  return renderHook(() => useBusinessesQuery({ ...props }), {
    wrapper: createQueryHookWrapper,
  });
};

describe('useBusinessesQuery', () => {
  it('should return correctly transformed data on success', async () => {
    const expectedData = transformBusinessesResponse({
      businessesPerPage,
      data: mockYelpBusinessesResponse,
      page: 1,
    });

    const { result } = renderUseBusinessesQuery();
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toStrictEqual(expectedData);
  });

  it('should call an API with correct parameters', async () => {
    const fetchMock = vi.spyOn(global, 'fetch');
    const expectedPage = 4;
    const expectedPerPage = 10;
    const { result } = renderUseBusinessesQuery({
      businessesPerPage: expectedPerPage,
      page: expectedPage,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock).toHaveBeenCalledWith(
      `${env.VITE_BUSINESSES_API_URL}?page=${expectedPage}&limit=${expectedPerPage}`,
    );
  });
});
