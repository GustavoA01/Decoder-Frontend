import { renderHook, act } from '@testing-library/react';
import { useChangeTab } from '../hooks/useChangeTab';

const replaceMock = jest.fn();
const usePathnameMock = jest.fn();
const useSearchParamsMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  usePathname: () => usePathnameMock(),
  useSearchParams: () => useSearchParamsMock(),
}));

describe('useChangeTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    usePathnameMock.mockReturnValue('/download');

    useSearchParamsMock.mockReturnValue({
      get: jest.fn().mockReturnValue('video'),
      toString: jest.fn().mockReturnValue('mode=video'),
    });
  });

  it('should return video as default tab', () => {
    useSearchParamsMock.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
      toString: jest.fn().mockReturnValue(''),
    });

    const { result } = renderHook(() => useChangeTab());

    expect(result.current.activeTab).toBe('video');
  });

  it('should return audio tab when mode is audio', () => {
    useSearchParamsMock.mockReturnValue({
      get: jest.fn().mockReturnValue('audio'),
      toString: jest.fn().mockReturnValue('mode=audio'),
    });

    const { result } = renderHook(() => useChangeTab());

    expect(result.current.activeTab).toBe('audio');
  });

  it('should return activeTabData correctly', () => {
    const { result } = renderHook(() => useChangeTab());

    expect(result.current.activeTabData).toEqual(
      expect.objectContaining({
        id: 'video',
      }),
    );
  });

  it('should call replace with updated params when changing tab', () => {
    useSearchParamsMock.mockReturnValue({
      get: jest.fn().mockReturnValue('video'),
      toString: jest.fn().mockReturnValue('mode=video'),
    });

    const { result } = renderHook(() => useChangeTab());

    act(() => {
      result.current.handleTabChange('audio');
    });

    expect(replaceMock).toHaveBeenCalledWith('/download?mode=audio', {
      scroll: false,
    });
  });

  it('should fallback to video for invalid mode', () => {
    useSearchParamsMock.mockReturnValue({
      get: jest.fn().mockReturnValue('invalid'),
      toString: jest.fn().mockReturnValue('mode=invalid'),
    });

    const { result } = renderHook(() => useChangeTab());

    expect(result.current.activeTab).toBe('video');
  });
});
