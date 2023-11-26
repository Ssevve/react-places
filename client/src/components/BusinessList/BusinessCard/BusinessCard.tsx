import { Business } from '@/api/businesses/useBusinessesQuery';
import {
  Avatar,
  CardActionArea,
  Typography,
  Card,
  Collapse,
  CardContent,
  Box,
} from '@mui/material';
import BrokenImageRoundedIcon from '@mui/icons-material/BrokenImageRounded';
import { YelpRating } from '@/components/YelpRating';
import { BusinessContactInfo } from '../BusinessContactInfo';

interface BusinessCardProps {
  business: Business;
  index: number;
  isExpanded: boolean;
  setExpanded: () => void;
}

// TODO: tests, fix half star
export function BusinessCard({ business, index, isExpanded, setExpanded }: BusinessCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 0,
        transition: 'border 150ms ease-out',
        borderLeft: isExpanded ? '5px solid #d32323' : 'none',
        '&:hover': {
          borderLeft: '5px solid #d32323',
        },
      }}
    >
      <CardActionArea disableRipple onClick={setExpanded}>
        <CardContent sx={{ display: 'flex', gap: '1rem' }}>
          <Avatar
            alt={business.name}
            src={business.imageUrl}
            variant="rounded"
            sx={{
              width: '6rem',
              height: '6rem',
            }}
          >
            <BrokenImageRoundedIcon sx={{ width: '3rem', height: '3rem' }} />
          </Avatar>
          <Box>
            <Typography component="h3" fontWeight="bold">
              {`${index}. ${business.name}`}
            </Typography>
            <YelpRating rating={business.rating || 0} />
          </Box>
        </CardContent>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <BusinessContactInfo
              phone={business.displayPhone}
              yelpUrl={business.url}
              address={business.location.displayAddress}
            />
          </CardContent>
        </Collapse>
      </CardActionArea>
    </Card>
  );
}
