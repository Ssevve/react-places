import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import { BusinessCardActionsButton } from './BusinessCardActionsButton';
import yelpLogo from '/assets/yelp-logo.svg';

export interface BusinessCardActionsProps {
  yelpUrl: string | null;
  name: string;
  isContactExpanded: boolean;
  toggleExpandedContact: () => void;
}

export function BusinessCardActions({
  name,
  yelpUrl,
  isContactExpanded,
  toggleExpandedContact,
}: BusinessCardActionsProps) {
  return (
    <CardActions
      data-testid="business-card-actions"
      sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
    >
      <BusinessCardActionsButton action={() => {}} label="Show on map" startIcon={<RoomRoundedIcon />} />
      <BusinessCardActionsButton
        onClick={toggleExpandedContact}
        label="Contact"
        endIcon={
          <KeyboardArrowDownIcon
            aria-hidden
            sx={{
              fontSize: 20,
              rotate: isContactExpanded ? '180deg' : 0,
              transition: 'rotate 150ms ease-in-out',
            }}
          />
        }
      />
      <Box>
        <Tooltip arrow title="visit Yelp page">
          <Link
            aria-label="visit Yelp page"
            href={yelpUrl || ''}
            marginLeft="auto"
            sx={{ pointerEvents: yelpUrl ? 'auto' : 'none' }}
          >
            <img height={20} src={yelpLogo} alt={`${name} yelp page`} />
          </Link>
        </Tooltip>
      </Box>
    </CardActions>
  );
}
