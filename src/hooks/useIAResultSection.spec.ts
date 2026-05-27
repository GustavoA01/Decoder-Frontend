import { renderHook, act } from '@testing-library/react';
import { useIAResultSection } from './useIAResultSection';

describe('useIAResultSection', () => {
  beforeEach(() => {
    jest.useFakeTimers();

    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should initialize copied as false', () => {
    const { result } = renderHook(() => useIAResultSection());

    expect(result.current.copied).toBe(false);
  });

  it('should copy the summary to clipboard', () => {
    const { result } = renderHook(() => useIAResultSection());

    act(() => {
      result.current.handleCopy('Resumo gerado');
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Resumo gerado');
  });

  it('should set copied to true after copying', () => {
    const { result } = renderHook(() => useIAResultSection());

    act(() => {
      result.current.handleCopy('Resumo gerado');
    });

    expect(result.current.copied).toBe(true);
  });

  it('should reset copied to false after 2 seconds', () => {
    const { result } = renderHook(() => useIAResultSection());

    act(() => {
      result.current.handleCopy('Resumo gerado');
    });

    expect(result.current.copied).toBe(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.copied).toBe(false);
  });

  it('should not copy when summary is empty', () => {
    const { result } = renderHook(() => useIAResultSection());

    act(() => {
      result.current.handleCopy('');
    });

    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    expect(result.current.copied).toBe(false);
  });

  it('should not copy again while copied is true', () => {
    const { result } = renderHook(() => useIAResultSection());

    act(() => {
      result.current.handleCopy('Primeiro resumo');
    });

    act(() => {
      result.current.handleCopy('Segundo resumo');
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'Primeiro resumo',
    );
  });
});
