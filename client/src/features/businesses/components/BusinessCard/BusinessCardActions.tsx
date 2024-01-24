import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import { BusinessCardActionsButton } from './BusinessCardActionsButton';
import yelpLogo from '/assets/yelp-logo.svg';

interface BusinessCardActionsProps {
  yelpUrl: string | undefined;
  name: string;
  isContactExpanded: boolean;
  toggleExpandedContact: () => void;
}

// TODO: tests
export function BusinessCardActions({
  name,
  yelpUrl,
  isContactExpanded,
  toggleExpandedContact,
}: BusinessCardActionsProps) {
  const contactButtonIcon = isContactExpanded ? (
    <KeyboardArrowUpIcon aria-hidden sx={{ fontSize: 20 }} />
  ) : (
    <KeyboardArrowDownIcon aria-hidden sx={{ fontSize: 20 }} />
  );

  return (
    <CardActions sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', px: 2 }}>
      <BusinessCardActionsButton action={() => {}} label="Show on map" startIcon={<RoomRoundedIcon />} />
      <BusinessCardActionsButton
        onClick={toggleExpandedContact}
        label="Contact"
        endIcon={contactButtonIcon}
      />
      <Box>
        <Tooltip arrow title="visit Yelp page">
          <Link
            aria-label="visit Yelp page"
            href={yelpUrl}
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
