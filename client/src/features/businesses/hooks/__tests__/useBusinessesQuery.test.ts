import { mockFetchBusinessesResponse } from '@/__mocks__/data';
import { createQueryHookWrapper } from '@/tests/createQueryHookWrapper';
import { renderHook, waitFor } from '@/tests/utils';
import { UseBusinessesQueryProps, useBusinessesQuery } from '../useBusinessesQuery';

interface RenderUseBusinessesQueryProps extends UseBusinessesQueryProps {
  initialEntries?: Array<string>;
}

const renderUseBusinessesQuery = ({ enabled = true, initialEntries }: RenderUseBusinessesQueryProps = {}) => {
  return renderHook(() => useBusinessesQuery({ enabled }), {
    wrapper: ({ children }) => createQueryHookWrapper({ children, initialEntries }),
  });
};

describe('useBusinessesQuery', () => {
  it('should not fetch if city was not provided', () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    renderUseBusinessesQuery({ initialEntries: ['/'] });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('should not fetch if disabled', () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    renderUseBusinessesQuery({ enabled: false, initialEntries: ['/'] });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('should return correct data on success', async () => {
    const { result } = renderUseBusinessesQuery({
      initialEntries: [`/?city=Warsaw`],
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toStrictEqual(mockFetchBusinessesResponse);
  });
});
