import { CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Map } from '@/components/Map';

const ContentWrapper = styled('div')({
  display: 'flex',
});

export const App = () => {
  return (
    <ContentWrapper>
      <CssBaseline />
      <Map />
    </ContentWrapper>
  );
};
