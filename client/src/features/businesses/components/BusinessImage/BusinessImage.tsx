import BrokenImageRoundedIcon from '@mui/icons-material/BrokenImageRounded';
import Avatar from '@mui/material/Avatar';

export interface BusinessImageProps {
  alt: string;
  src: string | undefined | null;
  size?: number;
  fullWidth?: boolean;
}

export function BusinessImage({ alt, src, size = 96, fullWidth = false }: BusinessImageProps) {
  return (
    <Avatar
      alt={alt}
      src={src || ''}
      variant="rounded"
      sx={{
        height: size,
        width: fullWidth ? '100%' : size,
      }}
    >
      <BrokenImageRoundedIcon sx={{ height: size / 2, width: size / 2 }} />
    </Avatar>
  );
}
