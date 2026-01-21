import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('test', 500));
        expect(result.current).toBe('test');
    });

    it('should debounce value changes', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'initial', delay: 500 } }
        );

        expect(result.current).toBe('initial');

        // Change value
        rerender({ value: 'updated', delay: 500 });

        // Value should still be initial (debounced)
        expect(result.current).toBe('initial');

        // Fast-forward time
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // Now value should be updated
        expect(result.current).toBe('updated');
    });

    it('should cancel previous timeout when value changes rapidly', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 500),
            { initialProps: { value: 'first' } }
        );

        rerender({ value: 'second' });

        act(() => {
            vi.advanceTimersByTime(300);
        });

        rerender({ value: 'third' });

        act(() => {
            vi.advanceTimersByTime(300);
        });

        // Should still be 'first' because debounce hasn't completed
        expect(result.current).toBe('first');

        act(() => {
            vi.advanceTimersByTime(200);
        });

        // Should now be 'third' (skipped 'second')
        expect(result.current).toBe('third');
    });
});
