import BrokenImageRoundedIcon from '@mui/icons-material/BrokenImageRounded';
import Avatar from '@mui/material/Avatar';

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
        height: size,
        width: size,
      }}
    >
      <BrokenImageRoundedIcon sx={{ height: '3rem', width: '3rem' }} />
    </Avatar>
  );
}
