import { mockBusinessesResponse } from '@/__mocks__';
import { createReactQueryWrapper } from '@/tests';
import { renderHook, waitFor } from '@testing-library/react';
import { useBusinessesQuery } from '.';

describe('useBusinessesQuery', () => {
  it('should return correctly transformed data on success', async () => {
    const { result } = renderHook(() => useBusinessesQuery(), {
      wrapper: createReactQueryWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.total).toEqual(mockBusinessesResponse.total);
  });
});
