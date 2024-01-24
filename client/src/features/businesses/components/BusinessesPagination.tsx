import { useDeviceSizes } from '@/hooks';
import Box from '@mui/material/Box';
import Pagination, { PaginationRenderItemParams } from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link, createSearchParams, useSearchParams } from 'react-router-dom';

export interface BusinessesPaginationProps {
  currentPage: number;
  pageCount: number;
}

export function BusinessesPagination({ currentPage, pageCount }: BusinessesPaginationProps) {
  const { isSmallMobile } = useDeviceSizes();
  const [searchParams] = useSearchParams();

  const renderPaginationItem = (item: PaginationRenderItemParams) => {
    const search = createSearchParams(searchParams);
    if (!item.page || item.page === 1) search.delete('page');
    else search.set('page', item.page.toString());

    return (
      <PaginationItem
        component={Link}
        to={{
          pathname: '.',
          search: search.toString(),
        }}
        {...item}
      />
    );
  };

  return (
    <Box data-testid="businesses-pagination" display="flex" justifyContent="center" paddingY={2} paddingX={1}>
      <Pagination
        defaultPage={1}
        page={currentPage}
        count={pageCount}
        shape="rounded"
        size={isSmallMobile ? 'small' : 'medium'}
        renderItem={renderPaginationItem}
      />
    </Box>
  );
}
