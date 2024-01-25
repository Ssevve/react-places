import { render, screen } from '@/tests/utils';
import { theme } from '@/theme';
import { userEvent } from '@testing-library/user-event';
import {
  MobileResponsiveDrawerToggler,
  MobileResponsiveDrawerTogglerProps,
} from './MobileResponsiveDrawerToggler';

const renderMobileResponsiveDrawerToggler = (
  props?: Partial<MobileResponsiveDrawerTogglerProps>,
) => {
  return render(
    <MobileResponsiveDrawerToggler
      width={20}
      isDrawerOpen={false}
      toggleDrawer={vi.fn()}
      {...props}
    />,
  );
};

describe('MobileResponsiveDrawerToggler', () => {
  it('should render with correct width', () => {
    const expectedWidth = 20;
    renderMobileResponsiveDrawerToggler({ width: expectedWidth });
    expect(screen.getByRole('button')).toHaveStyle({ width: `${expectedWidth}px` });
  });

  it('should have correct background and text color if drawer is closed', () => {
    renderMobileResponsiveDrawerToggler({ isDrawerOpen: false });
    const toggler = screen.getByRole('button');
    expect(toggler).toHaveStyle({ backgroundColor: theme.palette.primary.main });
    expect(toggler).toHaveStyle({ color: theme.palette.primary.contrastText });
  });

  it('should have correct background and text color if drawer is open', () => {
    renderMobileResponsiveDrawerToggler({ isDrawerOpen: true });
    const toggler = screen.getByRole('button');
    expect(toggler).toHaveStyle({ backgroundColor: theme.palette.neutral.main });
    expect(toggler).toHaveStyle({ color: theme.palette.neutral.contrastText });
  });

  it('should call "toggleDrawer" on click', async () => {
    const user = userEvent.setup();
    const mockToggleDrawer = vi.fn();
    renderMobileResponsiveDrawerToggler({ toggleDrawer: mockToggleDrawer });
    await user.click(screen.getByRole('button'));
    expect(mockToggleDrawer).toHaveBeenCalledOnce();
  });

  it('should render provided icon', () => {
    renderMobileResponsiveDrawerToggler({ icon: <span>Test icon</span> });
    expect(screen.getByText('Test icon')).toBeInTheDocument();
  });
});
