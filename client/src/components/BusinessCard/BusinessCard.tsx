import { Business } from '@/api/businesses/useBusinessesQuery';
import { BusinessCardContactInfo } from '@/components/BusinessCardContactInfo';
import yelpLogo from '@/assets/yelp-logo.svg';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import { BusinessImage } from '@/components/BusinessImage';
import { BusinessBaseInfo } from '@/components/BusinessBaseInfo';
import Box from '@mui/material/Box';
import { BusinessCardCategories } from '@/components/BusinessCardCategories';

interface BusinessCardProps {
  business: Business;
  index: number;
  isExpanded: boolean;
  setExpanded: () => void;
}

// TODO: tests
export function BusinessCard({ business, index, isExpanded, setExpanded }: BusinessCardProps) {
  const borderStyles = '5px solid #f40d15';
  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 0,
        transition: 'border 150ms ease-out',
        borderLeft: isExpanded ? borderStyles : 'none',
        '&:hover': {
          borderLeft: borderStyles,
        },
      }}
    >
      <CardActionArea disableRipple onClick={setExpanded}>
        <CardContent sx={{ display: 'flex', gap: '1rem', paddingRight: 0 }}>
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
}
