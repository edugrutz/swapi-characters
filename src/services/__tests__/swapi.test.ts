import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { fetchCharacters } from '../swapi';

const server = setupServer(
    http.get('https://swapi.py4e.com/api/people/', ({ request }) => {
        const url = new URL(request.url);
        const search = url.searchParams.get('search');
        const page = url.searchParams.get('page') || '1';

        if (search && search.toLowerCase().includes('luke')) {
            return HttpResponse.json({
                count: 1,
                next: null,
                previous: null,
                results: [
                    {
                        name: 'Luke Skywalker',
                        height: '172',
                        mass: '77',
                        hair_color: 'blond',
                        skin_color: 'fair',
                        eye_color: 'blue',
                        birth_year: '19BBY',
                        gender: 'male',
                        homeworld: 'https://swapi.py4e.com/api/planets/1/',
                        films: [],
                        species: [],
                        vehicles: [],
                        starships: [],
                        created: '2014-12-09T13:50:51.644000Z',
                        edited: '2014-12-20T21:17:56.891000Z',
                        url: 'https://swapi.py4e.com/api/people/1/',
                    },
                ],
            });
        }

        return HttpResponse.json({
            count: 82,
            next: page === '1' ? 'https://swapi.py4e.com/api/people/?page=2' : null,
            previous: null,
            results: [
                {
                    name: 'Test Character',
                    height: '180',
                    mass: '80',
                    hair_color: 'brown',
                    skin_color: 'light',
                    eye_color: 'brown',
                    birth_year: '20BBY',
                    gender: 'male',
                    homeworld: 'https://swapi.py4e.com/api/planets/1/',
                    films: [],
                    species: [],
                    vehicles: [],
                    starships: [],
                    created: '2014-12-09T13:50:51.644000Z',
                    edited: '2014-12-20T21:17:56.891000Z',
                    url: 'https://swapi.py4e.com/api/people/1/',
                },
            ],
        });
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SWAPI Service', () => {
    it('should fetch characters successfully', async () => {
        const result = await fetchCharacters({ page: 1 });

        expect(result).toHaveProperty('count');
        expect(result).toHaveProperty('results');
        expect(Array.isArray(result.results)).toBe(true);
        expect(result.count).toBe(82);
    });

    it('should filter characters by search term', async () => {
        const result = await fetchCharacters({ page: 1, search: 'Luke' });

        expect(result.results.length).toBe(1);
        expect(result.results[0].name).toBe('Luke Skywalker');
    });

    it('should handle pagination', async () => {
        const result = await fetchCharacters({ page: 1 });

        expect(result.next).toBeTruthy();
        expect(result.previous).toBeNull();
    });

    it('should return character with correct structure', async () => {
        const result = await fetchCharacters({ page: 1 });
        const character = result.results[0];

        expect(character).toHaveProperty('name');
        expect(character).toHaveProperty('height');
        expect(character).toHaveProperty('mass');
        expect(character).toHaveProperty('hair_color');
        expect(character).toHaveProperty('homeworld');
        expect(character).toHaveProperty('films');
    });
});
