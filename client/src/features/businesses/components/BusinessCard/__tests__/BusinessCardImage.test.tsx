/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@/tests/utils';
import { BusinessCardImage, BusinessCardImageProps } from '../BusinessCardImage';

const imageProps: BusinessCardImageProps = {
  alt: 'Test alt',
  src: 'https://www.testSrc.com',
};

const renderBusinessCardImage = (props?: Partial<BusinessCardImageProps>) => {
  return render(<BusinessCardImage {...imageProps} {...props} />);
};

describe('BusinessCardImage', () => {
  it('should render image with correct "alt" attribute', () => {
    renderBusinessCardImage();
    expect(screen.getByRole('img')).toHaveAttribute('alt', imageProps.alt);
  });

  it('should render image with correct "src" attribute', () => {
    renderBusinessCardImage();
    expect(screen.getByRole('img')).toHaveAttribute('src', imageProps.src);
  });

  it('should render image with provided size', () => {
    const expectedSize = 80;
    renderBusinessCardImage({ size: expectedSize });
    expect(screen.getByRole('img').parentElement).toHaveStyle({ height: `${expectedSize}px` });
    expect(screen.getByRole('img').parentElement).toHaveStyle({ width: `${expectedSize}px` });
  });

  it('should render with full width if "fullWidth" prop is true', () => {
    renderBusinessCardImage({ fullWidth: true });
    expect(screen.getByRole('img').parentElement).toHaveStyle({ width: '100%' });
  });

  it('should render broken image icon if image src is not valid', () => {
    renderBusinessCardImage({ src: '' });
    expect(screen.getByTestId('DomainIcon')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
