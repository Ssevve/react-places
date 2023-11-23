import { DataBox } from '@/components/DataBox';
import { Map } from '@/components/Map';
import { styled } from '@mui/material';

const ContentWrapper = styled('div')({
  display: 'flex',
  position: 'relative',
});

export const Home = () => {
  return (
    <ContentWrapper>
      <Map />
      <DataBox />
    </ContentWrapper>
  );
};
