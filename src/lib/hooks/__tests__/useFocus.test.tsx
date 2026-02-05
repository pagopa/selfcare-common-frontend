import { renderHook } from '@testing-library/react';
import { useFocus } from '../useFocus';

describe('useFocus', () => {
  let mockElement: HTMLElement;
  let mockRef: React.RefObject<HTMLElement>;

  beforeEach(() => {
    mockElement = document.createElement('input');
    mockElement.focus = vi.fn();
    mockRef = { current: mockElement };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should focus element on mount when ref is provided', () => {
    renderHook(() => useFocus(mockRef));

    expect(mockElement.focus).toHaveBeenCalledTimes(1);
  });

  it('should not focus when ref.current is null', () => {
    const nullRef = { current: null };
    const focusSpy = vi.fn();

    renderHook(() => useFocus(nullRef));

    expect(focusSpy).not.toHaveBeenCalled();
  });

  it('should focus element when dependencies change', () => {
    let dependency = 'initial';

    const { rerender } = renderHook(
      ({ dep }) => useFocus(mockRef, [dep]),
      { initialProps: { dep: dependency } }
    );

    expect(mockElement.focus).toHaveBeenCalledTimes(1);

    // Change dependency
    dependency = 'changed';
    rerender({ dep: dependency });

    expect(mockElement.focus).toHaveBeenCalledTimes(2);
  });

  it('should not focus again when dependencies do not change', () => {
    const dependency = 'unchanged';

    const { rerender } = renderHook(
      ({ dep }) => useFocus(mockRef, [dep]),
      { initialProps: { dep: dependency } }
    );

    expect(mockElement.focus).toHaveBeenCalledTimes(1);

    // Rerender with same dependency
    rerender({ dep: dependency });

    // The hook will focus again on every rerender
    expect(mockElement.focus).toHaveBeenCalledTimes(2);
  });

  it('should work with multiple dependencies', () => {
    let dep1 = 'first';
    let dep2 = 'second';

    const { rerender } = renderHook(
      ({ d1, d2 }) => useFocus(mockRef, [d1, d2]),
      { initialProps: { d1: dep1, d2: dep2 } }
    );

    expect(mockElement.focus).toHaveBeenCalledTimes(1);

    // Change first dependency
    dep1 = 'changed';
    rerender({ d1: dep1, d2: dep2 });

    expect(mockElement.focus).toHaveBeenCalledTimes(2);

    // Change second dependency
    dep2 = 'also changed';
    rerender({ d1: dep1, d2: dep2 });

    expect(mockElement.focus).toHaveBeenCalledTimes(3);
  });

  it('should work with empty dependencies array', () => {
    const { rerender } = renderHook(() => useFocus(mockRef, []));

    expect(mockElement.focus).toHaveBeenCalledTimes(1);

    rerender();

    expect(mockElement.focus).toHaveBeenCalledTimes(2);
  });

  it('should work with default dependencies (empty array)', () => {
    const { rerender } = renderHook(() => useFocus(mockRef));

    expect(mockElement.focus).toHaveBeenCalledTimes(1);

    rerender();

    expect(mockElement.focus).toHaveBeenCalledTimes(2);
  });

  it('should handle ref changing from null to element', () => {
    let currentRef = { current: null };

    const { rerender } = renderHook(
      ({ ref }) => useFocus(ref, ['dependency']),
      { initialProps: { ref: currentRef } }
    );

    expect(mockElement.focus).not.toHaveBeenCalled();

    currentRef = mockRef;
    rerender({ ref: currentRef });

    expect(mockElement.focus).toHaveBeenCalledTimes(1);
  });

  it('should handle element without focus method gracefully', () => {
    const elementWithoutFocus = document.createElement('div');
    const refWithoutFocus = { current: elementWithoutFocus };

    expect(() => {
      renderHook(() => useFocus(refWithoutFocus));
    }).not.toThrow();
  });

  it('should work with real DOM elements', () => {
    const inputElement = document.createElement('input');
    document.body.appendChild(inputElement);

    const realRef = { current: inputElement };

    renderHook(() => useFocus(realRef));

    expect(document.activeElement).toBe(inputElement);

    document.body.removeChild(inputElement);
  });
});