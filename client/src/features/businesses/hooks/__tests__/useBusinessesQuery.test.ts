import { mockYelpBusinessesResponse } from '@/__mocks__/data';
import { createQueryHookWrapper } from '@/tests/createQueryHookWrapper';
import { renderHook, waitFor } from '@/tests/utils';
import { BUSINESSES_PER_PAGE } from '../../constants';
import { transformBusinessesResponse } from '../../utils';
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

  it('should return correctly transformed data on success', async () => {
    const testPage = 2;
    const expectedData = transformBusinessesResponse({
      businessesPerPage: BUSINESSES_PER_PAGE,
      data: mockYelpBusinessesResponse,
      page: testPage,
    });

    const { result } = renderUseBusinessesQuery({
      initialEntries: [`/?city=Warsaw&page=${testPage}`],
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toStrictEqual(expectedData);
  });
});
