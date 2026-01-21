import { render, screen, fireEvent } from '../../../test/test-utils';
import { CharacterCard } from '../index';
import { vi, describe, it, expect } from 'vitest';
import type { Character } from '../../../types/character';

const mockCharacter: Partial<Character> = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.py4e.com/api/people/1/',
};

describe('CharacterCard', () => {
    it('renders character name and basic info', () => {
        render(
            <CharacterCard
                character={mockCharacter as Character}
                onClick={() => { }}
                getGenderIcon={() => <span data-testid="gender-icon">Icon</span>}
            />
        );

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText(/172 cm/)).toBeInTheDocument();
        expect(screen.getByText(/77 kg/)).toBeInTheDocument();
        expect(screen.getByTestId('gender-icon')).toBeInTheDocument();
    });

    it('calls onClick when card is clicked', () => {
        const handleClick = vi.fn();
        render(
            <CharacterCard
                character={mockCharacter as Character}
                onClick={handleClick}
                getGenderIcon={() => null}
            />
        );

        const card = screen.getByText('Luke Skywalker').closest('.ant-card');
        if (card) {
            fireEvent.click(card);
            expect(handleClick).toHaveBeenCalledWith(mockCharacter);
        }
    });
});
