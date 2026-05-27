import { render, screen } from '@testing-library/react';
import { DownloadTabs } from '../container/DownloadTabs';
import { useChangeTab } from '../hooks/useChangeTab';

jest.mock('../hooks/useChangeTab', () => ({
  useChangeTab: jest.fn(),
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

describe('DownloadTabs', () => {
  const handleTabChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useChangeTab as jest.Mock).mockReturnValue({
      activeTab: 'video',
      activeTabData: {
        description: 'Baixa o arquivo em formato de vídeo.',
      },
      handleTabChange,
    });
  });

  it('should render tabs buttons', () => {
    render(<DownloadTabs />);

    expect(screen.getAllByRole('button', { name: /vídeo/i })).toHaveLength(2);
    expect(screen.getByRole('button', { name: /áudio/i })).toBeInTheDocument();
  });

  it('should render download form when activeTabData exists', () => {
    render(<DownloadTabs />);

    expect(
      screen.getByText('Baixa o arquivo em formato de vídeo.'),
    ).toBeInTheDocument();

    expect(screen.getByText(/link do youtube/i)).toBeInTheDocument();
  });

  it('should not render download form when activeTabData does not exist', () => {
    (useChangeTab as jest.Mock).mockReturnValue({
      activeTab: 'video',
      activeTabData: undefined,
      handleTabChange,
    });

    render(<DownloadTabs />);

    expect(screen.queryByText(/link do youtube/i)).not.toBeInTheDocument();
  });

  it('should render container with correct classes', () => {
    const { container } = render(<DownloadTabs />);

    expect(container.firstChild).toHaveClass('w-full', 'space-y-5');
  });
});
