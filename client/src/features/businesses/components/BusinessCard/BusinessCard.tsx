import yelpLogo from '@/assets/yelp-logo.svg';
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
import { Business } from '../../api';
import { BusinessBaseInfo } from '../BusinessBaseInfo';
import { BusinessCardCategories } from '../BusinessCardCategories';
import { BusinessCardContactInfo } from '../BusinessCardContactInfo';
import { BusinessImage } from '../BusinessImage';

export interface BusinessCardProps {
  business: Omit<Business, 'coordinates'>;
  index: number;
  isExpanded: boolean;
  toggleExpanded: (id: string) => void;
  isHovered: boolean;
  toggleHovered: (id: string) => void;
  setCenteredBusinessId: (id: string) => void;
}

export const BusinessCard = memo(
  ({
    business,
    index,
    isExpanded,
    setCenteredBusinessId,
    toggleExpanded,
    toggleHovered,
    isHovered,
  }: BusinessCardProps) => {
    const isHighlighted = isExpanded || isHovered;
    return (
      <Card
        onMouseEnter={() => toggleHovered(business.id)}
        onMouseLeave={() => toggleHovered(business.id)}
        sx={{
          borderColor: '#f40d15',
          borderWidth: 0,
          // eslint-disable-next-line sort-keys-fix/sort-keys-fix
          borderLeftWidth: isHighlighted ? '5px' : 0,
          borderRadius: 0,
          borderStyle: 'solid',
          transition: 'all 150ms ease-out',
          width: '100%',
        }}
      >
        <CardActionArea disableRipple onClick={() => toggleExpanded(business.id)}>
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
            <ButtonBase
              component="div"
              sx={{
                color: '#f40d15',
              }}
              disableRipple
              onClick={(e) => {
                e.stopPropagation();
                setCenteredBusinessId(business.id);
              }}
            >
              <RoomRoundedIcon sx={{ fontSize: '0.85rem' }} />
              <Typography component="span" variant="subtitle2" fontSize="0.75rem">
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
  },
);
