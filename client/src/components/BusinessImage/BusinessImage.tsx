import Avatar from '@mui/material/Avatar';
import BrokenImageRoundedIcon from '@mui/icons-material/BrokenImageRounded';

interface BusinessImageProps {
  alt: string;
  src: string | undefined;
  size?: string;
}

export function BusinessImage({ alt, src, size = '6rem' }: BusinessImageProps) {
  return (
    <Avatar
      alt={alt}
      src={src}
      variant="rounded"
      sx={{
        width: size,
        height: size,
      }}
    >
      <BrokenImageRoundedIcon sx={{ width: '3rem', height: '3rem' }} />
    </Avatar>
  );
}
