import { render, screen } from '@testing-library/react';
import { InputSection } from '../components/InputSection';
import { FieldErrors } from 'react-hook-form';

describe('InputSection', () => {
  const register = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the label', () => {
    render(
      <InputSection errors={{}} isDownloading={false} register={register} />,
    );

    expect(screen.getByText(/link do youtube/i)).toBeInTheDocument();
  });

  it('should render the input with placeholder', () => {
    render(
      <InputSection errors={{}} isDownloading={false} register={register} />,
    );

    expect(
      screen.getByPlaceholderText('https://www.youtube.com/watch?v=...'),
    ).toBeInTheDocument();
  });

  it('should call register with url', () => {
    render(
      <InputSection errors={{}} isDownloading={false} register={register} />,
    );

    expect(register).toHaveBeenCalledWith('url');
  });

  it('should disable input when downloading', () => {
    render(
      <InputSection errors={{}} isDownloading={true} register={register} />,
    );

    expect(
      screen.getByPlaceholderText('https://www.youtube.com/watch?v=...'),
    ).toBeDisabled();
  });

  it('should render error message when url has error', () => {
    const mockError = {
      url: {
        message: 'Link inválido',
      },
    } as FieldErrors<{ url: string }>;

    render(
      <InputSection
        errors={mockError}
        isDownloading={false}
        register={register}
      />,
    );

    expect(screen.getByText('Link inválido')).toBeInTheDocument();
  });
});
