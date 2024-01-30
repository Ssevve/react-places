import { mockCities } from '@/__mocks__/data';
import { server } from '@/__mocks__/server';
import { env } from '@/config/env';
import { render, screen, waitFor } from '@/tests/utils';
import { userEvent } from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { CitiesAutocomplete } from './CitiesAutocomplete';

const renderCitiesAutocomplete = ({ city = '' } = {}) => {
  return render(<CitiesAutocomplete />, {
    initialEntries: [`/?city=${city}`],
  });
};

describe('CitiesAutocomplete', () => {
  it('should render input with correct label', () => {
    renderCitiesAutocomplete();
    expect(screen.getByRole('combobox', { name: /find a city/i })).toBeInTheDocument();
  });

  it('should render loading indicator when fetching cities', async () => {
    const user = userEvent.setup();
    renderCitiesAutocomplete();
    await user.type(screen.getByRole('combobox'), 'War');
    expect(await screen.findByRole('progressbar')).toBeInTheDocument();
  });

  it('should render "No cities" if options were not fetched yet', async () => {
    const user = userEvent.setup();
    renderCitiesAutocomplete();
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText(/no cities/i)).toBeInTheDocument();
  });

  it('should correctly display initial option if it was provided', async () => {
    const expectedCityName = 'Warsaw';
    renderCitiesAutocomplete({ city: expectedCityName });
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toHaveValue(expectedCityName);
    });
  });

  it('should correctly render all options when opened after successful fetch', async () => {
    const user = userEvent.setup();
    renderCitiesAutocomplete();
    await user.type(screen.getByRole('combobox'), 'War');
    await waitFor(() => {
      mockCities.forEach(({ name, country }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText(country.code, { exact: false })).toBeInTheDocument();
        expect(screen.getByText(country.name, { exact: false })).toBeInTheDocument();
      });
    });
  });

  it('should correctly display chosen city name', async () => {
    const user = userEvent.setup();
    const expectedCityName = 'Warsaw';
    renderCitiesAutocomplete();

    const inputElement = screen.getByRole('combobox');

    await user.type(inputElement, expectedCityName);
    await user.click(await screen.findByText(expectedCityName));
    expect(inputElement).toHaveValue(expectedCityName);
  });

  it('should render error message on fetch error', async () => {
    const user = userEvent.setup();
    server.use(http.get(env.VITE_CITIES_API_URL, HttpResponse.error));
    renderCitiesAutocomplete();
    await user.type(screen.getByRole('combobox'), 'Warsaw');
    expect(await screen.findByText(/error: failed to load cities/i)).toBeInTheDocument();
  });
});
