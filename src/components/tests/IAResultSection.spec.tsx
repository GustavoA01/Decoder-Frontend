import { render, screen } from '@testing-library/react';
import { useIAResultProvider } from '@/src/data/IAResultContext';
import { useIAResultSection } from '@/src/hooks/useIAResultSection';
import { IAResultSection } from '../IAResultSection';
import userEvent from '@testing-library/user-event';

jest.mock('../../data/IAResultContext', () => ({
  useIAResultProvider: jest.fn(),
}));

jest.mock('../../hooks/useIAResultSection', () => ({
  useIAResultSection: jest.fn(),
}));

jest.mock('../ui/button', () => ({
  Button: ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

describe('IAResultSection', () => {
  const handleCopy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useIAResultSection as jest.Mock).mockReturnValue({
      copied: false,
      handleCopy,
    });
  });

  it('should not render when there is no content', () => {
    (useIAResultProvider as jest.Mock).mockReturnValue({
      error: '',
      isGenerating: false,
      status: '',
      summary: '',
    });

    const { container } = render(<IAResultSection />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render the title', () => {
    (useIAResultProvider as jest.Mock).mockReturnValue({
      error: '',
      isGenerating: false,
      status: '',
      summary: 'Resumo gerado',
    });

    render(<IAResultSection />);

    expect(screen.getByText('Resultado da IA')).toBeInTheDocument();
  });

  it('should render the summary', () => {
    (useIAResultProvider as jest.Mock).mockReturnValue({
      error: '',
      isGenerating: false,
      status: '',
      summary: 'Este é o resumo gerado pela IA.',
    });

    render(<IAResultSection />);

    expect(
      screen.getByText('Este é o resumo gerado pela IA.'),
    ).toBeInTheDocument();
  });

  it('should render the status when it exists', () => {
    (useIAResultProvider as jest.Mock).mockReturnValue({
      error: '',
      isGenerating: true,
      status: 'Gerando resumo...',
      summary: '',
    });

    render(<IAResultSection />);

    expect(screen.getByText('Gerando resumo...')).toBeInTheDocument();
  });

  it('should render the error message', () => {
    (useIAResultProvider as jest.Mock).mockReturnValue({
      error: 'Erro ao gerar resumo',
      isGenerating: false,
      status: '',
      summary: '',
    });

    render(<IAResultSection />);

    expect(screen.getByText('Erro ao gerar resumo')).toBeInTheDocument();
  });

  it('should call handleCopy when clicking copy button', async () => {
    const user = userEvent.setup();

    (useIAResultProvider as jest.Mock).mockReturnValue({
      error: '',
      isGenerating: false,
      status: '',
      summary: 'Resumo para copiar',
    });

    render(<IAResultSection />);

    await user.click(screen.getByRole('button'));

    expect(handleCopy).toHaveBeenCalledWith('Resumo para copiar');
  });

  it('should show copied icon when copied is true', () => {
    (useIAResultSection as jest.Mock).mockReturnValue({
      copied: true,
      handleCopy,
    });

    (useIAResultProvider as jest.Mock).mockReturnValue({
      error: '',
      isGenerating: false,
      status: '',
      summary: 'Resumo copiado',
    });

    render(<IAResultSection />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
