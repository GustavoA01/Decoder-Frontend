import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('../Header/SmallTitle', () => ({
  SmallTitle: () => <div data-testid="small-title">SmallTitle</div>,
}));

jest.mock('../Header/BadgesSection', () => ({
  BadgesSection: () => <div data-testid="badges-section">BadgesSection</div>,
}));

describe('Header', () => {
  it('should render the main heading', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', {
        name: 'Decodifique vídeos em minutos',
      }),
    ).toBeInTheDocument();
  });

  it('should render the description text', () => {
    render(<Header />);

    expect(
      screen.getByText(
        'Transforme vídeos longos em resumos inteligentes, capítulos, posts e ideias de cortes em poucos minutos.',
      ),
    ).toBeInTheDocument();
  });

  it('should render the SmallTitle component', () => {
    render(<Header />);

    expect(screen.getByTestId('small-title')).toBeInTheDocument();
  });

  it('should render the BadgesSection component', () => {
    render(<Header />);

    expect(screen.getByTestId('badges-section')).toBeInTheDocument();
  });

  it('should render a header element', () => {
    const { container } = render(<Header />);

    const header = container.querySelector('header');

    expect(header).toBeInTheDocument();
  });

  it('should have the correct header classes', () => {
    const { container } = render(<Header />);

    const header = container.querySelector('header');

    expect(header).toHaveClass('space-y-8', 'select-none');
  });
});
