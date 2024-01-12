import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import React from 'react';

interface BusinessesErrorMessageProps extends React.PropsWithChildren {
  message?: string;
}

export function BusinessesErrorMessage({ message, children }: BusinessesErrorMessageProps) {
  return (
    <Box textAlign="center" paddingInline={2} paddingBlock={2}>
      <DomainDisabledIcon sx={{ fontSize: 80, mb: 2, opacity: 0.4 }} />
      <Box>
        {message && <Typography>{message}</Typography>}
        {children}
      </Box>
    </Box>
  );
}
