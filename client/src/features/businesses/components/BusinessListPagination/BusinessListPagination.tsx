import { useDeviceSizes } from '@/hooks';
import Box from '@mui/material/Box';
import Pagination, { PaginationRenderItemParams } from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link, createSearchParams, useSearchParams } from 'react-router-dom';

export interface BusinessListPaginationProps {
  currentPage: number;
  pageCount: number;
}

export function BusinessListPagination({ currentPage, pageCount }: BusinessListPaginationProps) {
  const { isSmallMobile } = useDeviceSizes();
  const [searchParams] = useSearchParams();

  const renderPaginationItem = (item: PaginationRenderItemParams) => {
    const search = createSearchParams(searchParams);
    if (item.page === 1) search.delete('page');
    else search.set('page', `${item.page}`);

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
    <Box display="flex" justifyContent="center">
      <Pagination
        defaultPage={1}
        page={currentPage}
        count={pageCount}
        shape="rounded"
        sx={{ px: 1, py: 2 }}
        size={isSmallMobile ? 'small' : 'medium'}
        renderItem={renderPaginationItem}
      />
    </Box>
  );
}
