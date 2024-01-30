import { SvgIconComponent } from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

function BusinessCardContactInfoSpan({ children }: React.PropsWithChildren) {
  return (
    <Typography component="span" variant="subtitle2" marginLeft={1}>
      {children}
    </Typography>
  );
}

interface BusinessCardContactInfoIconProps {
  icon: SvgIconComponent;
}

function BusinessCardContactInfoIcon({ icon: Icon }: BusinessCardContactInfoIconProps) {
  return <Icon sx={{ color: 'primary.main' }} />;
}

interface BusinessCardContactInfoProps {
  phone: string | null;
  address: string;
}

export function BusinessCardContactInfo({ phone, address }: BusinessCardContactInfoProps) {
  return (
    <List disablePadding>
      <ListItem disableGutters>
        <BusinessCardContactInfoIcon icon={CallIcon} />
        <BusinessCardContactInfoSpan>{phone || 'Not available'}</BusinessCardContactInfoSpan>
      </ListItem>
      <Divider />
      <ListItem disableGutters>
        <BusinessCardContactInfoIcon icon={HomeIcon} />
        <BusinessCardContactInfoSpan>{address}</BusinessCardContactInfoSpan>
      </ListItem>
    </List>
  );
}
