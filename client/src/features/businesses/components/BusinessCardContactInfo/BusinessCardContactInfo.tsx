import yelpBurst from '@/assets/yelp_burst.svg';
import BusinessIcon from '@mui/icons-material/Business';
import CallIcon from '@mui/icons-material/Call';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import Typography, { TypographyOwnProps } from '@mui/material/Typography';
import { joinAddress } from './joinAddress';

const businessCardContactInfoTypographyProps: Partial<TypographyOwnProps> = {
  marginLeft: '0.5rem',
  variant: 'subtitle2',
};

function BusinessCardContactInfoSpan({ children }: React.PropsWithChildren) {
  return (
    <Typography component="span" {...businessCardContactInfoTypographyProps}>
      {children}
    </Typography>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string;
};

interface BusinessCardContactInfoIconProps {
  icon: MuiIcon;
}

function BusinessCardContactInfoIcon({ icon: Icon }: BusinessCardContactInfoIconProps) {
  return <Icon sx={{ color: '#f40d15' }} />;
}

export interface BusinessCardContactInfoProps {
  phone: string;
  yelpUrl: string | undefined;
  address: string[];
}

export function BusinessCardContactInfo({ phone, yelpUrl, address }: BusinessCardContactInfoProps) {
  const displayAddress = joinAddress(address);
  return (
    <List disablePadding>
      <ListItem disableGutters>
        <BusinessCardContactInfoIcon icon={CallIcon} />
        <BusinessCardContactInfoSpan>{phone}</BusinessCardContactInfoSpan>
      </ListItem>
      <Divider />
      <ListItem disableGutters>
        <img src={yelpBurst} alt="Yelp burst" width={24} />
        <Link href={yelpUrl} underline="hover" {...businessCardContactInfoTypographyProps}>
          Yelp page
        </Link>
      </ListItem>
      <Divider />
      <ListItem disableGutters>
        <BusinessCardContactInfoIcon icon={BusinessIcon} />
        <BusinessCardContactInfoSpan>{displayAddress}</BusinessCardContactInfoSpan>
      </ListItem>
    </List>
  );
}
