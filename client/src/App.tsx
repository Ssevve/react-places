import { styled } from '@mui/material';
import { Map } from '@/components/Map';
import { DataBox } from '@/components/DataBox';

const ContentWrapper = styled('div')({
  display: 'flex',
  position: 'relative',
});

export function App() {
  return (
    <ContentWrapper>
      <Map />
      <DataBox />
    </ContentWrapper>
  );
}
