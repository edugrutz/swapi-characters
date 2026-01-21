import { render, screen, fireEvent, waitFor } from '../../../test/test-utils';
import { CharacterGrid } from '../index';
import { useCharacters } from '../../../hooks/useCharacters';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../../../hooks/useCharacters');

const mockCharacters = [
    { name: 'Luke Skywalker', gender: 'male', url: '1', height: '172', mass: '77', birth_year: '19BBY' },
    { name: 'Leia Organa', gender: 'female', url: '2', height: '150', mass: '49', birth_year: '19BBY' },
];

describe('CharacterGrid', () => {
    beforeEach(() => {
        vi.mocked(useCharacters).mockReturnValue({
            data: { results: mockCharacters, count: 2 },
            isFetching: false,
            error: null,
        } as any);
    });

    it('renders a list of characters', () => {
        render(<CharacterGrid />);
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Leia Organa')).toBeInTheDocument();
    });

    it('shows loading state when fetching', () => {
        vi.mocked(useCharacters).mockReturnValue({
            data: null,
            isFetching: true,
            error: null,
        } as any);

        render(<CharacterGrid />);
        // Ant Design List shows a spin when loading is true
        expect(document.querySelector('.ant-spin')).toBeInTheDocument();
    });

    it('shows error alert when there is an error', () => {
        vi.mocked(useCharacters).mockReturnValue({
            data: null,
            isFetching: false,
            error: new Error('Failed to fetch'),
        } as any);

        render(<CharacterGrid />);
        expect(screen.getByText(/Failed to fetch/)).toBeInTheDocument();
    });

    it('updates search value on input change', async () => {
        render(<CharacterGrid />);
        const input = screen.getByPlaceholderText('Search characters by name...');
        fireEvent.change(input, { target: { value: 'R2-D2' } });
        expect(input).toHaveValue('R2-D2');
    });
});
