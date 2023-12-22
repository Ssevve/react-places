import { mockYelpBusinessesResponse } from '@/__mocks__';
import { createQueryHookWrapper } from '@/tests/createQueryHookWrapper';
import { renderHook, waitFor } from '@/tests/utils';
import { transformBusinessesResponse } from '../utils';
import { useBusinessesQuery } from './useBusinessesQuery';
import { businessesPerPage } from '../constants';

describe('useBusinessesQuery', () => {
  it('should return correctly transformed data on success', async () => {
    const expectedData = transformBusinessesResponse({
      businessesPerPage,
      data: mockYelpBusinessesResponse,
      page: 1,
    });

    const { result } = renderHook(() => useBusinessesQuery(), {
      wrapper: createQueryHookWrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toStrictEqual(expectedData);
  });
});
