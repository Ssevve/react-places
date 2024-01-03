import { useBusinessesQuery } from '../../api';
import { BusinessList, BusinessesErrorMessage } from '../../components';

interface BusinessesProps {
  toggleDrawer: () => void;
  setHighlightedBusinessId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function Businesses({ setHighlightedBusinessId, toggleDrawer }: BusinessesProps) {
  const {
    data: businessesData,
    isPending,
    fetchStatus,
  } = useBusinessesQuery({
    throwOnError: true,
  });

  const isWaitingForInitialInput = isPending && fetchStatus === 'idle';
  return isWaitingForInitialInput ? (
    <BusinessesErrorMessage message="You need to provide a city before we can show recommended places!" />
  ) : (
    <BusinessList
      setHighlightedBusinessId={setHighlightedBusinessId}
      toggleDrawer={toggleDrawer}
      businesses={businessesData?.businesses}
      totalBusinesses={businessesData?.total || 0}
    />
  );
}
