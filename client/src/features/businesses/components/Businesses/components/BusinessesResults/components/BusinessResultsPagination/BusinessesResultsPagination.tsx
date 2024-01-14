import { useDeviceSizes } from '@/hooks';
import Pagination, { PaginationRenderItemParams } from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Box from '@mui/material/Box';
import { Link, createSearchParams, useSearchParams } from 'react-router-dom';

export interface BusinessesResultsPaginationProps {
  currentPage: number;
  pageCount: number;
}

export function BusinessesResultsPagination({ currentPage, pageCount }: BusinessesResultsPaginationProps) {
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
    pageCount > 1 && (
      <Box display="flex" justifyContent="center" paddingY={2} paddingX={1}>
        <Pagination
          defaultPage={1}
          page={currentPage}
          count={pageCount}
          shape="rounded"
          size={isSmallMobile ? 'small' : 'medium'}
          renderItem={renderPaginationItem}
        />
      </Box>
    )
  );
}
