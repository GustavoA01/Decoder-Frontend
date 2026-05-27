import { render, screen } from '@testing-library/react';
import { DownloadForm } from '../container/DownloadForm';
import { useSubmitForm } from '../hooks/useSubmitForm';
import { useDownloadForm } from '../hooks/useDownloadForm';
import { useIAForm } from '../hooks/useIAForm';

jest.mock('../hooks/useSubmitForm', () => ({
  useSubmitForm: jest.fn(),
}));

jest.mock('../hooks/useDownloadForm', () => ({
  useDownloadForm: jest.fn(),
}));

jest.mock('../hooks/useIAForm', () => ({
  useIAForm: jest.fn(),
}));

describe('DownloadForm', () => {
  const register = jest.fn(() => ({
    name: 'url',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  }));

  const handleSubmit = jest.fn((callback) => callback);
  const handleDownload = jest.fn();
  const onSubmitIAForm = jest.fn();
  const setSelectedOutput = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useSubmitForm as jest.Mock).mockReturnValue({
      errors: {},
      handleSubmit,
      register,
    });

    (useDownloadForm as jest.Mock).mockReturnValue({
      handleDownload,
      isDownloading: false,
    });

    (useIAForm as jest.Mock).mockReturnValue({
      isGeneratingIA: false,
      onSubmitIAForm,
      selectedOutput: 'summary',
      setSelectedOutput,
    });
  });

  it('should render the input section', () => {
    render(
      <DownloadForm
        description={'Baixa o arquivo em formato de vídeo.'}
        activeTab="video"
      />,
    );

    expect(screen.getByText(/link do youtube/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('https://www.youtube.com/watch?v=...'),
    ).toBeInTheDocument();
  });

  it('should render the first description', () => {
    const description =
      'Baixa o arquivo em formato de vídeo a partir da URL enviada';
    render(<DownloadForm description={description} activeTab="video" />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('should render the description', () => {
    const description = 'Extrai o audio do vídeo e faz download em formato mp3';
    render(<DownloadForm description={description} activeTab="video" />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('should render IA section', () => {
    render(<DownloadForm description="Descrição" activeTab="video" />);

    expect(screen.getByText(/resultado desejado/i)).toBeInTheDocument();
  });

  it('should render form footer buttons', () => {
    render(<DownloadForm description="Descrição" activeTab="video" />);

    expect(
      screen.getByRole('button', {
        name: /baixar arquivo/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /gerar resultado/i,
      }),
    ).toBeInTheDocument();
  });

  it('should call useDownloadForm with activeTab', () => {
    render(<DownloadForm description="Descrição" activeTab="audio" />);

    expect(useDownloadForm).toHaveBeenCalledWith('audio');
  });

  it('should pass loading download state to button', () => {
    (useDownloadForm as jest.Mock).mockReturnValue({
      handleDownload,
      isDownloading: true,
    });

    render(<DownloadForm description="Descrição" activeTab="video" />);

    expect(
      screen.getByRole('button', {
        name: /baixando/i,
      }),
    ).toBeDisabled();
  });

  it('should pass generating IA state to button', () => {
    (useIAForm as jest.Mock).mockReturnValue({
      isGeneratingIA: true,
      onSubmitIAForm,
      selectedOutput: 'summary',
      setSelectedOutput,
    });

    render(<DownloadForm description="Descrição" activeTab="video" />);

    expect(
      screen.getByRole('button', {
        name: /gerando/i,
      }),
    ).toBeDisabled();
  });

  it('should connect submit handlers with handleSubmit', () => {
    render(<DownloadForm description="Descrição" activeTab="video" />);

    expect(handleSubmit).toHaveBeenCalledWith(onSubmitIAForm);
    expect(handleSubmit).toHaveBeenCalledWith(handleDownload);
  });
});
