import { useDeviceSizes } from '@/hooks';
import Box from '@mui/material/Box';
import Pagination, { PaginationRenderItemParams } from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link, createSearchParams, useSearchParams } from 'react-router-dom';

export interface BusinessListPaginationProps {
  currentPage: number;
  totalBusinesses: number;
  businessesPerPage: number;
}

export function BusinessListPagination({
  currentPage,
  totalBusinesses,
  businessesPerPage,
}: BusinessListPaginationProps) {
  const { isSmallMobile } = useDeviceSizes();
  const [searchParams] = useSearchParams();
  const pageCount = totalBusinesses ? Math.ceil(totalBusinesses / businessesPerPage) : 1;

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

  return pageCount > 1 ? (
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
  ) : null;
}
