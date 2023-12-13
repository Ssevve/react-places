/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { BusinessImage, BusinessImageProps } from '.';

const imageProps: BusinessImageProps = {
  alt: 'Test alt',
  src: 'https://www.testSrc.com',
};

const renderBusinessImage = (props?: Partial<BusinessImageProps>) => {
  return render(<BusinessImage {...imageProps} {...props} />);
};

describe('BusinessImage', () => {
  it('should render image with correct "alt" attribute', () => {
    renderBusinessImage();
    expect(screen.getByRole('img')).toHaveAttribute('alt', imageProps.alt);
  });

  it('should render image with correct "src" attribute', () => {
    renderBusinessImage();
    expect(screen.getByRole('img')).toHaveAttribute('src', imageProps.src);
  });

  it('should render image with provided size', () => {
    const expectedSize = 80;
    renderBusinessImage({ size: expectedSize });
    expect(screen.getByRole('img').parentElement).toHaveStyle({ height: `${expectedSize}px` });
    expect(screen.getByRole('img').parentElement).toHaveStyle({ width: `${expectedSize}px` });
  });

  it('should render with full width if "fullWidth" prop is true', () => {
    renderBusinessImage({ fullWidth: true });
    expect(screen.getByRole('img').parentElement).toHaveStyle({ width: '100%' });
  });

  it('should render <BrokenImageRoundedIcon /> if image src is not valid', () => {
    renderBusinessImage({ src: '' });
    expect(screen.getByTestId('BrokenImageRoundedIcon')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
