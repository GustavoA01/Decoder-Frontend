import { render, screen } from '@testing-library/react';
import { BadgesSection } from '../Header/BadgesSection';

const labels = [
  'YouTube',
  'Resumo com IA',
  'Capítulos automáticos',
  'Transcrição',
  'Posts prontos',
  'Sugestões de cortes',
];

describe('BadgesSection', () => {
  it('should render all badges labels', () => {
    render(<BadgesSection />);

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('should render the correct number of badges', () => {
    render(<BadgesSection />);

    expect(screen.getAllByText(/.+/)).toHaveLength(labels.length);
  });
});
