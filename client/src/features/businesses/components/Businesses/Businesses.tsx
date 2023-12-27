import { useSearchParams } from 'react-router-dom';
import { useBusinessesQuery } from '../../api';
import { BusinessList, BusinessesErrorMessage } from '../../components';

interface BusinessesProps {
  toggleDrawer: () => void;
  setHighlightedBusinessId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function Businesses({ setHighlightedBusinessId, toggleDrawer }: BusinessesProps) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const city = searchParams.get('city');
  const {
    data: businessesData,
    isPending,
    fetchStatus,
  } = useBusinessesQuery({
    city,
    page: currentPage,
    throwOnError: true,
  });

  const isWaitingForInitialInput = isPending && fetchStatus === 'idle';
  return isWaitingForInitialInput ? (
    <BusinessesErrorMessage message="Please provide a city before we can show recommended places!" />
  ) : (
    <BusinessList
      setHighlightedBusinessId={setHighlightedBusinessId}
      toggleDrawer={toggleDrawer}
      businesses={businessesData?.businesses}
      totalBusinesses={businessesData?.total || 0}
      currentPage={currentPage}
    />
  );
}
