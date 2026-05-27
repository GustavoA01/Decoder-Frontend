import { render, screen } from '@testing-library/react';
import { DownloadHeader } from '../components/DownloadHeader';

describe('DownloadHeader', () => {
  it('should render the title', () => {
    render(<DownloadHeader />);

    expect(screen.getByText('Decodificar vídeo')).toBeInTheDocument();
  });

  it('should render the description', () => {
    render(<DownloadHeader />);

    expect(
      screen.getByText(
        'Cole um link e escolha como quer transformar o conteúdo.',
      ),
    ).toBeInTheDocument();
  });

  it('should render the icon container', () => {
    const { container } = render(<DownloadHeader />);

    const iconContainer = container.querySelector('.bg-cyan-400\\/14');

    expect(iconContainer).toBeInTheDocument();
  });

  it('should render the card header with correct classes', () => {
    const { container } = render(<DownloadHeader />);

    const header = container.querySelector('.border-b');

    expect(header).toHaveClass(
      'gap-3',
      'border-b',
      'border-white/10',
      'bg-white/3',
      'py-6',
    );
  });

  it('should render the title with correct classes', () => {
    render(<DownloadHeader />);

    const title = screen.getByText('Decodificar vídeo');

    expect(title).toHaveClass('text-xl', 'leading-tight', 'text-white');
  });

  it('should render the description with correct classes', () => {
    render(<DownloadHeader />);

    const description = screen.getByText(
      'Cole um link e escolha como quer transformar o conteúdo.',
    );

    expect(description).toHaveClass('max-w-sm', 'text-white/58');
  });
});
