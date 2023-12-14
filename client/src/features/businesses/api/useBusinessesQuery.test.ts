import { mockYelpBusinessesResponse } from '@/__mocks__';
import { createReactQueryWrapper } from '@/tests/createReactQueryWrapper';
import { renderHook, waitFor } from '@/tests/utils';
import { transformBusinessesResponse } from '../utils';
import { useBusinessesQuery } from './useBusinessesQuery';

describe('useBusinessesQuery', () => {
  it('should return correctly transformed data on success', async () => {
    const { result } = renderHook(() => useBusinessesQuery(), {
      wrapper: createReactQueryWrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toStrictEqual(
      transformBusinessesResponse(mockYelpBusinessesResponse),
    );
  });
});
