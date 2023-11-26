import { BusinessList } from '@/components/BusinessList';
import { Box } from './DataBox.styles';

export function DataBox() {
  return (
    <Box elevation={6}>
      <BusinessList />
    </Box>
  );
}
