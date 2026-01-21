import { describe, it, expect } from 'vitest';
import { extractId } from '../extractId';

describe('extractId', () => {
    it('should extract ID from SWAPI URL', () => {
        const url = 'https://swapi.py4e.com/api/people/1/';
        expect(extractId(url)).toBe('1');
    });

    it('should extract ID from URL without trailing slash', () => {
        const url = 'https://swapi.py4e.com/api/films/5';
        expect(extractId(url)).toBe('5');
    });

    it('should extract multi-digit IDs', () => {
        const url = 'https://swapi.py4e.com/api/starships/123/';
        expect(extractId(url)).toBe('123');
    });

    it('should return empty string for invalid URLs', () => {
        const url = 'https://example.com/invalid';
        expect(extractId(url)).toBe('');
    });

    it('should return empty string for empty string', () => {
        expect(extractId('')).toBe('');
    });

    it('should handle different resource types', () => {
        expect(extractId('https://swapi.py4e.com/api/vehicles/42/')).toBe('42');
        expect(extractId('https://swapi.py4e.com/api/planets/8/')).toBe('8');
        expect(extractId('https://swapi.py4e.com/api/species/3/')).toBe('3');
    });
});
