import { citiesPoland } from '@/features/cities';
import { render, screen } from '@/tests/utils';
import { userEvent } from '@testing-library/user-event';
import { CitiesAutocomplete } from './CitiesAutocomplete';

const renderCitiesAutocomplete = ({ city = '' } = {}) => {
  return render(<CitiesAutocomplete />, {
    initialEntries: [`/?city=${city}`],
  });
};

describe('CitiesAutocomplete', () => {
  it('should render input with correct label', () => {
    renderCitiesAutocomplete();
    expect(screen.getByRole('combobox', { name: 'Select a city' })).toBeInTheDocument();
  });

  it('should render all options on click', async () => {
    const user = userEvent.setup();
    renderCitiesAutocomplete();
    await user.click(screen.getByRole('combobox'));
    citiesPoland.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should have correct value when available', () => {
    const expectedCity = citiesPoland[0];
    renderCitiesAutocomplete({ city: expectedCity });
    expect(screen.getByRole('combobox')).toHaveValue(expectedCity);
  });
});
