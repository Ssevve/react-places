import { createMatchMedia } from '@/tests/createMatchMedia';
import { render, screen } from '@/tests/utils';
import { theme } from '@/theme';
import { ResponsiveDrawer } from '../ResponsiveDrawer';

describe('ResponsiveDrawer', () => {
  it('should render on mobile devices if open', () => {
    window.matchMedia = createMatchMedia(theme.breakpoints.values.md - 1);
    render(<ResponsiveDrawer open={true} />);
    expect(screen.getByTestId('responsive-drawer')).toBeInTheDocument();
  });

  it('should not render on mobile devices if closed', () => {
    window.matchMedia = createMatchMedia(theme.breakpoints.values.md - 1);
    render(<ResponsiveDrawer open={false} />);
    expect(screen.queryByTestId('responsive-drawer')).not.toBeInTheDocument();
  });

  it('should not unmount if "keepMounted" is true', () => {
    window.matchMedia = createMatchMedia(theme.breakpoints.values.md - 1);
    render(<ResponsiveDrawer open={false} keepMounted />);
    expect(screen.getByTestId('responsive-drawer')).toBeInTheDocument();
  });

  it('should not render toggle button on non-mobile devices', () => {
    window.matchMedia = createMatchMedia(theme.breakpoints.values.md);
    render(<ResponsiveDrawer includeToggler={true} open={false} toggleDrawer={() => {}} />);
    expect(screen.queryByLabelText(/close drawer/i)).not.toBeInTheDocument();
  });

  it('should render toggle button on mobile devices if it is included', () => {
    window.matchMedia = createMatchMedia(theme.breakpoints.values.md - 1);
    render(<ResponsiveDrawer includeToggler={true} open={true} toggleDrawer={() => {}} />);
    expect(screen.getByLabelText(/close drawer/i)).toBeInTheDocument();
  });

  it('should not render toggle button on mobile devices if it is not included', () => {
    window.matchMedia = createMatchMedia(theme.breakpoints.values.md - 1);
    render(<ResponsiveDrawer includeToggler={false} open={true} />);
    expect(screen.queryByLabelText(/close drawer/i)).not.toBeInTheDocument();
  });

  it('should render children', () => {
    const expectedChild = 'Test child';
    render(<ResponsiveDrawer open={true}>{expectedChild}</ResponsiveDrawer>);
    expect(screen.getByText(expectedChild)).toBeInTheDocument();
  });
});
