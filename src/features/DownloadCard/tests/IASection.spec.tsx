import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { outputOptions } from '@/src/data/constants';
import { IASection } from '../components/IASection';

describe('IASection', () => {
  const setSelectedOutput = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the section label', () => {
    render(
      <IASection
        selectedOutput="summary"
        setSelectedOutput={setSelectedOutput}
      />,
    );

    expect(screen.getByText(/resultado desejado/i)).toBeInTheDocument();
  });

  it('should render all output options', () => {
    render(
      <IASection
        selectedOutput="summary"
        setSelectedOutput={setSelectedOutput}
      />,
    );

    outputOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();

      expect(screen.getByText(option.description)).toBeInTheDocument();
    });
  });

  it('should call setSelectedOutput when clicking an option', async () => {
    const user = userEvent.setup();

    render(
      <IASection
        selectedOutput="summary"
        setSelectedOutput={setSelectedOutput}
      />,
    );

    const chaptersButton = screen.getByText(/capítulos/i).closest('button');

    expect(chaptersButton).toBeInTheDocument();

    await user.click(chaptersButton!);

    expect(setSelectedOutput).toHaveBeenCalledWith('chapters');
  });

  it('should apply selected styles to the selected option', () => {
    render(
      <IASection
        selectedOutput="summary"
        setSelectedOutput={setSelectedOutput}
      />,
    );

    const selectedButton = screen
      .getByText(outputOptions[0].label)
      .closest('button');

    expect(selectedButton).toHaveClass('border-cyan-300/45', 'bg-cyan-300/10');
  });

  it('should apply default styles to unselected options', () => {
    render(
      <IASection
        selectedOutput="summary"
        setSelectedOutput={setSelectedOutput}
      />,
    );

    const unselectedButton = screen
      .getByText(outputOptions[1].label)
      .closest('button');

    expect(unselectedButton).toHaveClass('border-white/10', 'bg-white/5');
  });

  it('should render all buttons', () => {
    render(
      <IASection
        selectedOutput="summary"
        setSelectedOutput={setSelectedOutput}
      />,
    );

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(outputOptions.length);
  });
});
