import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabsButtons } from '../components/TabsButtons';
import { tabs } from '@/src/data/constants';

describe('TabsButtons', () => {
  const handleTabChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all tabs', () => {
    render(<TabsButtons activeTab="video" handleTabChange={handleTabChange} />);

    tabs.forEach((tab) => {
      expect(
        screen.getByRole('button', {
          name: tab.label,
        }),
      ).toBeInTheDocument();
    });
  });

  it('should call handleTabChange when clicking a tab', async () => {
    const user = userEvent.setup();

    render(<TabsButtons activeTab="video" handleTabChange={handleTabChange} />);

    await user.click(
      screen.getByRole('button', {
        name: /áudio/i,
      }),
    );

    expect(handleTabChange).toHaveBeenCalledWith('audio');
  });

  it('should apply active styles to active tab', () => {
    render(<TabsButtons activeTab="video" handleTabChange={handleTabChange} />);

    const activeButton = screen.getByRole('button', {
      name: /vídeo/i,
    });

    expect(activeButton).toHaveClass('text-slate-950');
  });

  it('should apply inactive styles to inactive tab', () => {
    render(<TabsButtons activeTab="video" handleTabChange={handleTabChange} />);

    const inactiveButton = screen.getByRole('button', {
      name: /áudio/i,
    });

    expect(inactiveButton).toHaveClass('text-white');
  });

  it('should render the correct number of buttons', () => {
    render(<TabsButtons activeTab="video" handleTabChange={handleTabChange} />);

    expect(screen.getAllByRole('button')).toHaveLength(tabs.length);
  });

  it('should render container with correct classes', () => {
    const { container } = render(
      <TabsButtons activeTab="video" handleTabChange={handleTabChange} />,
    );

    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass(
      'grid',
      'grid-cols-2',
      'rounded-2xl',
      'bg-white/8',
      'p-1',
    );
  });
});
