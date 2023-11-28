import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography, { TypographyOwnProps } from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CallIcon from '@mui/icons-material/Call';
import yelpBurst from '@/assets/yelp_burst.svg';
import BusinessIcon from '@mui/icons-material/Business';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

const businessCardContactInfoTypographyProps: Partial<TypographyOwnProps> = {
  variant: 'subtitle2',
  marginLeft: '0.5rem',
};

function BusinessCardContactInfoSpan({ children }: React.PropsWithChildren) {
  return (
    <Typography component="span" {...businessCardContactInfoTypographyProps}>
      {children}
    </Typography>
  );
}

type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string;
};

interface BusinessCardContactInfoIconProps {
  icon: MuiIcon;
}

function BusinessCardContactInfoIcon({ icon: Icon }: BusinessCardContactInfoIconProps) {
  return <Icon sx={{ color: '#f40d15' }} />;
}

interface BusinessCardContactInfoProps {
  phone: string;
  yelpUrl: string | undefined;
  address: string[];
}

export function BusinessCardContactInfo({ phone, yelpUrl, address }: BusinessCardContactInfoProps) {
  const displayAddress = address.join(', ');
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
