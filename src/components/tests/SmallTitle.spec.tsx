import { render, screen } from '@testing-library/react';
import { SmallTitle } from '../Header/SmallTitle';

describe('SmallTitle', () => {
  it('should render the Decoder text', () => {
    render(<SmallTitle />);

    expect(screen.getByLabelText('Decoder')).toBeInTheDocument();
  });

  it('should render all letters individually', () => {
    render(<SmallTitle />);

    const letters = 'Decoder'.split('');

    letters.forEach((letter) => {
      expect(screen.getAllByText(letter)[0]).toBeInTheDocument();
    });
  });

  it('should render the correct amount of spans', () => {
    const { container } = render(<SmallTitle />);

    const spans = container.querySelectorAll('span');

    expect(spans).toHaveLength('Decoder'.length);
  });

  it('should have the correct classes', () => {
    render(<SmallTitle />);

    const title = screen.getByLabelText('Decoder');

    expect(title).toHaveClass(
      'font-mono',
      'uppercase',
      'text-lg',
      'tracking-[0.5em]',
      'text-cyan-300/80',
    );
  });
});
