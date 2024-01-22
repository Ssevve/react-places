import { useDeviceSizes } from '@/hooks';
import Box from '@mui/material/Box';
import Pagination, { PaginationRenderItemParams } from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link, createSearchParams, useSearchParams } from 'react-router-dom';
import { BUSINESSES_PER_PAGE } from '../constants';

export interface BusinessesPaginationProps {
  currentPage: number;
  totalBusinesses: number;
}

export function BusinessesPagination({ currentPage, totalBusinesses }: BusinessesPaginationProps) {
  const { isSmallMobile } = useDeviceSizes();
  const [searchParams] = useSearchParams();

  const pageCount = totalBusinesses ? Math.ceil(totalBusinesses / BUSINESSES_PER_PAGE) : 1;

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
    pageCount > 1 && (
      <Box
        data-testid="businesses-pagination"
        display="flex"
        justifyContent="center"
        paddingY={2}
        paddingX={1}
      >
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
