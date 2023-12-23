import { render, screen } from '@/tests/utils';
import { theme } from '@/theme';
import { userEvent } from '@testing-library/user-event';
import { MobileDrawerToggler, MobileDrawerTogglerProps } from './MobileDrawerToggler';

const renderMobileDrawerToggler = (props?: Partial<MobileDrawerTogglerProps>) => {
  return render(
    <MobileDrawerToggler width={20} isDrawerOpen={false} toggleDrawer={vi.fn()} {...props} />,
  );
};

describe('MobileDrawerToggler', () => {
  it('should render with correct width', () => {
    const expectedWidth = 20;
    renderMobileDrawerToggler({ width: expectedWidth });
    expect(screen.getByRole('button')).toHaveStyle({ width: `${expectedWidth}px` });
  });

  it('should have correct background and text color if drawer is closed', () => {
    renderMobileDrawerToggler({ isDrawerOpen: false });
    const toggler = screen.getByRole('button');
    expect(toggler).toHaveStyle({ backgroundColor: theme.palette.primary.main });
    expect(toggler).toHaveStyle({ color: theme.palette.primary.contrastText });
  });

  it('should have correct background and text color if drawer is open', () => {
    renderMobileDrawerToggler({ isDrawerOpen: true });
    const toggler = screen.getByRole('button');
    expect(toggler).toHaveStyle({ backgroundColor: theme.palette.neutral.main });
    expect(toggler).toHaveStyle({ color: theme.palette.neutral.contrastText });
  });

  it('should call "toggleDrawer" on click', async () => {
    const user = userEvent.setup();
    const mockToggleDrawer = vi.fn();
    renderMobileDrawerToggler({ toggleDrawer: mockToggleDrawer });
    await user.click(screen.getByRole('button'));
    expect(mockToggleDrawer).toHaveBeenCalledOnce();
  });
});
