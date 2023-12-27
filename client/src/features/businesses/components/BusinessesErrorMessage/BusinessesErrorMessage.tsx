import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';

interface BusinessesErrorMessageProps {
  message: string;
}

export function BusinessesErrorMessage({ message }: BusinessesErrorMessageProps) {
  return (
    <Box textAlign="center" paddingInline={1} paddingBlock={2}>
      <DomainDisabledIcon sx={{ fontSize: 80, mb: 2, opacity: 0.4 }} />
      <Typography>{message}</Typography>
    </Box>
  );
}
