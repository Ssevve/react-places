import BrokenImageRoundedIcon from '@mui/icons-material/BrokenImageRounded';
import Avatar from '@mui/material/Avatar';

export interface BusinessCardImageProps {
  alt: string;
  src: string | undefined | null;
  size?: number;
  fullWidth?: boolean;
}

export const BusinessCardImage = ({ alt, src, size = 96, fullWidth = false }: BusinessCardImageProps) => {
  return (
    <Avatar
      data-testid="business-card-image"
      alt={alt}
      src={src || ''}
      variant="rounded"
      sx={{
        height: size,
        width: fullWidth ? 1 : size,
      }}
    >
      <BrokenImageRoundedIcon sx={{ height: size / 2, width: size / 2 }} />
    </Avatar>
  );
};
