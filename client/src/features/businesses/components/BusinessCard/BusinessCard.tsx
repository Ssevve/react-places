import { useDeviceSizes } from '@/hooks';
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

export interface BusinessCardProps {
  business: Omit<TransformedBusiness, 'coordinates'>;
  isExpanded: boolean;
  toggleExpandedBusiness: (id: string) => void;
}

export const BusinessCard = memo(({ business, isExpanded, toggleExpandedBusiness }: BusinessCardProps) => {
  const { isSmallMobile } = useDeviceSizes();

  const {
    imageUrl,
    displayIndex,
    isClosed,
    name,
    price,
    rating,
    reviewCount,
    categories,
    displayPhone,
    location,
    id,
    url,
  } = business;

  const highlightBorderWidth = 4;

  return (
    <Card
      sx={(theme) => ({
        '&::after': {
          backgroundColor: theme.palette.primary.main,
          content: "''",
          height: 1,
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
        borderBottom: 1,
        borderColor: theme.palette.grey[300],
        borderRadius: 0,
        boxShadow: 'none',
        position: 'relative',
        transition: 'background 250ms ease-in-out',
        width: 1,
      })}
    >
      <CardContent
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
          },
        })}
      >
        <BusinessCardImage alt={name} src={imageUrl} fullWidth={isSmallMobile} />
        <Box display="flex" flexDirection="column" gap={1}>
          <BusinessCardBaseInfo
            displayIndex={displayIndex}
            isClosed={isClosed}
            name={name}
            price={price}
            rating={rating}
            reviewCount={reviewCount}
          />
          <BusinessCardCategories categories={categories} />
        </Box>
      </CardContent>
      <Collapse in={isExpanded} timeout="auto" easing="ease-in-out" unmountOnExit>
        <CardContent>
          <BusinessCardContactInfo phone={displayPhone} address={location.displayAddress} />
        </CardContent>
      </Collapse>
      <BusinessCardActions
        isContactExpanded={isExpanded}
        yelpUrl={url}
        name={name}
        toggleExpandedContact={() => toggleExpandedBusiness(id)}
      />
    </Card>
  );
});
