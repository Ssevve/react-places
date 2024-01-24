import { useDeviceSizes } from '@/hooks';
import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { memo } from 'react';
import { TransformedBusiness } from '../../types';
import { BusinessCardActions } from './BusinessCardActions';
import { BusinessCardBaseInfo } from './BusinessCardBaseInfo';
import { BusinessCardCategories } from './BusinessCardCategories';
import { BusinessCardContactInfo } from './BusinessCardContactInfo';
import { BusinessCardImage } from './BusinessCardImage';

const highlightBorderWidth = 4;

const businessCardStyles: (val: boolean) => SxProps<Theme> = (isExpanded: boolean) => (theme: Theme) => ({
  '&::after': {
    backgroundColor: theme.palette.primary.main,
    content: "''",
    height: '100%',
    left: 0,
    maxWidth: isExpanded ? highlightBorderWidth : 0,
    position: 'absolute',
    top: 0,
    transition: 'max-width 150ms ease-out',
    width: highlightBorderWidth,
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  '&:hover::after': {
    maxWidth: highlightBorderWidth,
  },
  backgroundColor: isExpanded ? theme.palette.grey[100] : 'transparent',
  borderRadius: 0,
  boxShadow: 'none',
  position: 'relative',
  transition: 'background 250ms ease-in-out',
  width: '100%',
});

const cardContentStyles: SxProps<Theme> = (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
});

export interface BusinessCardProps {
  business: Omit<TransformedBusiness, 'coordinates'>;
  isExpanded: boolean;
  toggleExpandedBusiness: (id: string) => void;
}

export const BusinessCard = memo(({ business, isExpanded, toggleExpandedBusiness }: BusinessCardProps) => {
  const { isSmallMobile } = useDeviceSizes();

  return (
    <Card sx={businessCardStyles(isExpanded)}>
      <CardContent sx={cardContentStyles}>
        <BusinessCardImage alt={business.name} src={business.imageUrl} fullWidth={isSmallMobile} />
        <Box display="flex" flexDirection="column" gap={1}>
          <BusinessCardBaseInfo
            displayIndex={business.displayIndex}
            isClosed={business.isClosed}
            name={business.name}
            price={business.price}
            rating={business.rating}
            reviewCount={business.reviewCount}
          />
          <BusinessCardCategories categories={business.categories} />
        </Box>
      </CardContent>
      <Collapse in={isExpanded} timeout="auto" easing="ease-in-out" unmountOnExit>
        <CardContent>
          <BusinessCardContactInfo phone={business.displayPhone} address={business.location.displayAddress} />
        </CardContent>
      </Collapse>
      <BusinessCardActions
        isContactExpanded={isExpanded}
        yelpUrl={business.url}
        name={business.name}
        toggleExpandedContact={() => toggleExpandedBusiness(business.id)}
      />
    </Card>
  );
});
