import { CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Map } from '@/components/Map';

const Aside = styled('div')({
  flexBasis: '20%',
  flexShrink: '1',
});

const ContentWrapper = styled('div')({
  display: 'flex',
});

export const App = () => {
  return (
    <ContentWrapper>
      <CssBaseline />
      <Aside>
        <p>Place List</p>
      </Aside>
      <Map />
    </ContentWrapper>
  );
};
