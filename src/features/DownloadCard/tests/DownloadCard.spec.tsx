import { render, screen } from '@testing-library/react';
import { DownloadCard } from '../container';

jest.mock('../hooks/useChangeTab', () => ({
  useChangeTab: jest.fn(() => ({
    activeTab: 'video',
    handleChangeTab: jest.fn(),
  })),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(() => ({
    data: { formats: [] },
    isLoading: false,
    error: null,
  })),
  useMutation: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isLoading: false,
    error: null,
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  usePathname: jest.fn(() => '/download'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('../../../data/IAResultContext', () => ({
  useIAResultContext: jest.fn(() => ({
    setIAResult: jest.fn(),
  })),
  useIAResultProvider: jest.fn(() => ({})),
}));

describe('DownloadCard', () => {
  it('should render the header title', () => {
    render(<DownloadCard />);

    expect(screen.getByText('Decodificar vídeo')).toBeInTheDocument();
  });

  it('should render tabs buttons', () => {
    render(<DownloadCard />);

    expect(
      screen.getByRole('button', {
        name: /vídeo/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /áudio/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render card content', () => {
    render(<DownloadCard />);

    expect(
      screen.getByText(
        /cole um link e escolha como quer transformar o conteúdo/i,
      ),
    ).toBeInTheDocument();
  });

  it('should render card with correct classes', () => {
    const { container } = render(<DownloadCard />);

    const card = container.firstChild;

    expect(card).toHaveClass(
      'border',
      'bg-white/4',
      'py-0',
      'text-white',
      'shadow-2xl',
      'shadow-black/30',
      'backdrop-blur-xl',
    );
  });
});
