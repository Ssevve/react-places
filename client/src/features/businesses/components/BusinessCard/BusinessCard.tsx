import { TransformedBusiness } from '@/features/businesses';
import { useDeviceSizes } from '@/hooks';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import {
  BusinessCardBaseInfo,
  BusinessCardCategories,
  BusinessCardContactInfo,
  BusinessCardImage,
} from './components';

import yelpLogo from '/assets/yelp-logo.svg';

export interface BusinessCardProps {
  business: Omit<TransformedBusiness, 'coordinates'>;
  isExpanded: boolean;
  toggleExpanded: (id: string) => void;
}

const highlightBorderWidth = 4;

export const BusinessCard = memo(({ business, isExpanded, toggleExpanded }: BusinessCardProps) => {
  const { isSmallMobile } = useDeviceSizes();

  return (
    <Card
      sx={{
        '&::after': {
          backgroundColor: 'primary.main',
          content: "''",
          height: '100%',
          left: 0,
          maxWidth: isExpanded ? highlightBorderWidth : 0,
          position: 'absolute',
          top: 0,
          transition: 'max-width 150ms ease-out',
          width: highlightBorderWidth,
        },
        '&:hover::after': {
          maxWidth: highlightBorderWidth,
        },
        borderRadius: 0,
        boxShadow: 'none',
        position: 'relative',
        width: '100%',
      }}
    >
      <CardActionArea data-testid="business-card-action-area" onClick={() => toggleExpanded(business.id)}>
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
            <BusinessCardContactInfo
              phone={business.displayPhone}
              yelpUrl={business.url}
              address={business.location.displayAddress}
            />
          </CardContent>
        </Collapse>
        <CardActions sx={{ px: 2 }}>
          <ButtonBase
            component="div"
            sx={{
              color: 'primary.main',
            }}
            onClick={() => {}}
          >
            <RoomRoundedIcon sx={{ fontSize: 14 }} />
            <Typography component="span" variant="subtitle2" fontSize={12}>
              Show on map
            </Typography>
          </ButtonBase>
          <Tooltip arrow title="Visit Yelp page">
            <Link
              onClick={(e) => e.stopPropagation()}
              href={business.url}
              marginLeft="auto"
              sx={{ pointerEvents: business.url ? 'auto' : 'none' }}
            >
              <img height={20} src={yelpLogo} alt={`${business.name} yelp page`} />
            </Link>
          </Tooltip>
        </CardActions>
      </CardActionArea>
    </Card>
  );
});
