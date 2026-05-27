import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormFooter } from '../components/FormFooter';

const defaultProps = {
  onSubmitDownload: jest.fn(),
  onSubmitIA: jest.fn(),
  isGeneratingIA: false,
  isDownloading: false,
};

describe('FormFooter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render both buttons', () => {
    render(<FormFooter {...defaultProps} />);

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

  it('should call onSubmitDownload when clicking download button', async () => {
    const user = userEvent.setup();

    render(<FormFooter {...defaultProps} />);

    await user.click(
      screen.getByRole('button', {
        name: /baixar arquivo/i,
      }),
    );

    expect(defaultProps.onSubmitDownload).toHaveBeenCalledTimes(1);
  });

  it('should call onSubmitIA when clicking IA button', async () => {
    const user = userEvent.setup();

    render(<FormFooter {...defaultProps} />);

    await user.click(
      screen.getByRole('button', {
        name: /gerar resultado/i,
      }),
    );

    expect(defaultProps.onSubmitIA).toHaveBeenCalledTimes(1);
  });

  it('should show loading text when downloading', () => {
    render(<FormFooter {...defaultProps} isDownloading={true} />);

    expect(
      screen.getByRole('button', {
        name: /baixando/i,
      }),
    ).toBeInTheDocument();

    expect(screen.queryByText(/baixar arquivo/i)).not.toBeInTheDocument();
  });

  it('should show generating text when generating IA', () => {
    render(<FormFooter {...defaultProps} isGeneratingIA={true} />);

    expect(
      screen.getByRole('button', {
        name: /gerando/i,
      }),
    ).toBeInTheDocument();

    expect(screen.queryByText(/gerar resultado/i)).not.toBeInTheDocument();
  });

  it('should disable download button while downloading', () => {
    render(<FormFooter {...defaultProps} isDownloading={true} />);

    expect(
      screen.getByRole('button', {
        name: /baixando/i,
      }),
    ).toBeDisabled();
  });

  it('should disable IA button while generating', () => {
    render(<FormFooter {...defaultProps} isGeneratingIA={true} />);

    expect(
      screen.getByRole('button', {
        name: /gerando/i,
      }),
    ).toBeDisabled();
  });

  it('should render footer with correct classes', () => {
    const { container } = render(<FormFooter {...defaultProps} />);

    const footer = container.querySelector('footer');

    expect(footer).toHaveClass('grid', 'gap-3', 'sm:grid-cols-2');
  });
});
