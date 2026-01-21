import { render, screen } from '../../../test/test-utils';
import { CharacterProfile } from '../index';
import { useCharacters } from '../../../hooks/useCharacters';
import { useCharacterDetails } from '../../../hooks/useCharacterDetails';
import { useHomeworld } from '../../../hooks/useHomeworld';
import { useParams } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../../../hooks/useCharacters');
vi.mock('../../../hooks/useCharacterDetails');
vi.mock('../../../hooks/useHomeworld');
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: vi.fn(),
        useNavigate: () => vi.fn(),
    };
});

const mockCharacter = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    homeworld: 'url-planet',
};

describe('CharacterProfile', () => {
    beforeEach(() => {
        vi.mocked(useParams).mockReturnValue({ name: 'Luke Skywalker' });
        vi.mocked(useCharacters).mockReturnValue({
            data: { results: [mockCharacter] },
            isFetching: false,
            error: null,
        } as any);
        vi.mocked(useCharacterDetails).mockReturnValue({
            films: [],
            species: [],
            vehicles: [],
            starships: [],
            isLoading: false,
        } as any);
        vi.mocked(useHomeworld).mockReturnValue({
            homeworld: { name: 'Tatooine' },
            isLoading: false,
        } as any);
    });

    it('renders character profile information', () => {
        render(<CharacterProfile />);

        // Check character name in header
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

        // Check homeworld
        expect(screen.getByText('Tatooine')).toBeInTheDocument();

        // Check basic info
        expect(screen.getByText(/172 cm/)).toBeInTheDocument();
        expect(screen.getByText(/77 kg/)).toBeInTheDocument();
        expect(screen.getByText('19BBY')).toBeInTheDocument();
    });

    it('shows loading state when fetching character', () => {
        vi.mocked(useCharacters).mockReturnValue({
            data: null,
            isFetching: true,
            error: null,
        } as any);

        render(<CharacterProfile />);
        expect(document.querySelector('.ant-spin')).toBeInTheDocument();
    });

    it('shows error alert when character not found', () => {
        vi.mocked(useCharacters).mockReturnValue({
            data: { results: [] },
            isFetching: false,
            error: null,
        } as any);

        render(<CharacterProfile />);
        expect(screen.getByText(/Character not found/i)).toBeInTheDocument();
    });
});
