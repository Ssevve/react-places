// import { mockFetchBusinessesResponse } from '@/__mocks__/data';
// import { createQueryHookWrapper } from '@/tests/createQueryHookWrapper';
// import { renderHook, waitFor } from '@/tests/utils';
// import { useBusinessesQuery } from '..';
// import { UseQueryOptions } from '@tanstack/react-query';

// interface RenderUseBusinessesQueryProps extends UseQueryOptions {
//   initialEntries?: Array<string>;
// }

// const renderUseBusinessesQuery = ({ initialEntries }: RenderUseBusinessesQueryProps) => {
//   return renderHook(() => useBusinessesQuery(), {
//     wrapper: ({ children }) => createQueryHookWrapper({ children, initialEntries }),
//   });
// };

// describe('useBusinessesQuery', () => {
//   it('should not fetch if city was not provided', () => {
//     const fetchSpy = vi.spyOn(global, 'fetch');
//     renderUseBusinessesQuery({ initialEntries: ['/'] });
//     expect(fetchSpy).not.toHaveBeenCalled();
//   });

//   it('should not fetch by default', () => {
//     const fetchSpy = vi.spyOn(global, 'fetch');
//     renderUseBusinessesQuery({ initialEntries: ['/'] });
//     expect(fetchSpy).not.toHaveBeenCalled();
//   });

//   it('should return correct data on success', async () => {
//     const { result } = renderUseBusinessesQuery({
//       enabled: true,
//       initialEntries: [`/?city=Warsaw`],
//     });
//     await waitFor(() => expect(result.current.isSuccess).toBe(true));
//     expect(result.current.data).toStrictEqual(mockFetchBusinessesResponse);
//   });
// });
