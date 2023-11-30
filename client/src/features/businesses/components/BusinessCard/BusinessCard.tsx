import yelpLogo from '@/assets/yelp-logo.svg';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import { memo } from 'react';
import { Business } from '../../api/useBusinessesQuery';
import { BusinessBaseInfo } from '../BusinessBaseInfo';
import { BusinessCardCategories } from '../BusinessCardCategories';
import { BusinessCardContactInfo } from '../BusinessCardContactInfo';
import { BusinessImage } from '../BusinessImage';

interface BusinessCardProps {
  business: Business;
  index: number;
  isExpanded: boolean;
  setExpanded: (id: string) => void;
}

// TODO: tests
export const BusinessCard = memo(
  ({ business, index, isExpanded, setExpanded }: BusinessCardProps) => {
    const expandedBorderWidth = '5px';
    return (
      <Card
        sx={[
          {
            '&:hover': {
              borderLeftWidth: expandedBorderWidth,
            },
            borderColor: '#f40d15',
            borderRadius: 0,
            borderStyle: 'solid',
            borderWidth: 0,
            transition: 'all 150ms ease-out',
            width: '100%',
          },
          isExpanded && {
            borderLeftWidth: expandedBorderWidth,
          },
        ]}
      >
        <CardActionArea disableRipple onClick={() => setExpanded(business.id)}>
          <CardContent sx={{ display: 'flex', gap: '1rem', paddingRight: '0.5rem' }}>
            <BusinessImage alt={business.name} src={business.imageUrl} />
            <Box display="flex" flexDirection="column" gap="0.5rem">
              <BusinessBaseInfo
                index={index}
                isClosed={business.isClosed}
                name={business.name}
                price={business.price}
                rating={business.rating}
                reviewCount={business.reviewCount}
              />
              <BusinessCardCategories categories={business.categories} />
            </Box>
          </CardContent>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <CardContent>
              <BusinessCardContactInfo
                phone={business.displayPhone}
                yelpUrl={business.url}
                address={business.location.displayAddress}
              />
            </CardContent>
          </Collapse>
          <CardActions>
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
  },
);
