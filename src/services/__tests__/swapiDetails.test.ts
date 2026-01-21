import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { fetchFilmById, fetchPlanetById, fetchVehicleById, fetchStarshipById } from '../swapiDetails';

const server = setupServer(
    http.get('https://swapi.py4e.com/api/films/:id/', ({ params }) => {
        return HttpResponse.json({
            title: 'A New Hope',
            episode_id: 4,
            opening_crawl: 'It is a period of civil war...',
            director: 'George Lucas',
            producer: 'Gary Kurtz, Rick McCallum',
            release_date: '1977-05-25',
            characters: [],
            planets: [],
            starships: [],
            vehicles: [],
            species: [],
            created: '2014-12-10T14:23:31.880000Z',
            edited: '2014-12-20T19:49:45.256000Z',
            url: `https://swapi.py4e.com/api/films/${params.id}/`,
        });
    }),

    http.get('https://swapi.py4e.com/api/planets/:id/', ({ params }) => {
        return HttpResponse.json({
            name: 'Tatooine',
            rotation_period: '23',
            orbital_period: '304',
            diameter: '10465',
            climate: 'arid',
            gravity: '1 standard',
            terrain: 'desert',
            surface_water: '1',
            population: '200000',
            residents: [],
            films: [],
            created: '2014-12-09T13:50:49.641000Z',
            edited: '2014-12-20T20:58:18.411000Z',
            url: `https://swapi.py4e.com/api/planets/${params.id}/`,
        });
    }),

    http.get('https://swapi.py4e.com/api/vehicles/:id/', ({ params }) => {
        return HttpResponse.json({
            name: 'Sand Crawler',
            model: 'Digger Crawler',
            manufacturer: 'Corellia Mining Corporation',
            cost_in_credits: '150000',
            length: '36.8',
            max_atmosphering_speed: '30',
            crew: '46',
            passengers: '30',
            cargo_capacity: '50000',
            consumables: '2 months',
            vehicle_class: 'wheeled',
            pilots: [],
            films: [],
            created: '2014-12-10T15:36:25.724000Z',
            edited: '2014-12-20T21:30:21.661000Z',
            url: `https://swapi.py4e.com/api/vehicles/${params.id}/`,
        });
    }),

    http.get('https://swapi.py4e.com/api/starships/:id/', ({ params }) => {
        return HttpResponse.json({
            name: 'Death Star',
            model: 'DS-1 Orbital Battle Station',
            manufacturer: 'Imperial Department of Military Research',
            cost_in_credits: '1000000000000',
            length: '120000',
            max_atmosphering_speed: 'n/a',
            crew: '342953',
            passengers: '843342',
            cargo_capacity: '1000000000000',
            consumables: '3 years',
            hyperdrive_rating: '4.0',
            MGLT: '10',
            starship_class: 'Deep Space Mobile Battlestation',
            pilots: [],
            films: [],
            created: '2014-12-10T16:36:50.509000Z',
            edited: '2014-12-20T21:26:24.783000Z',
            url: `https://swapi.py4e.com/api/starships/${params.id}/`,
        });
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SWAPI Details Service', () => {
    describe('fetchFilmById', () => {
        it('should fetch film details successfully', async () => {
            const film = await fetchFilmById('1');

            expect(film.title).toBe('A New Hope');
            expect(film.episode_id).toBe(4);
            expect(film.director).toBe('George Lucas');
        });
    });

    describe('fetchPlanetById', () => {
        it('should fetch planet details successfully', async () => {
            const planet = await fetchPlanetById('1');

            expect(planet.name).toBe('Tatooine');
            expect(planet.climate).toBe('arid');
            expect(planet.terrain).toBe('desert');
        });
    });

    describe('fetchVehicleById', () => {
        it('should fetch vehicle details successfully', async () => {
            const vehicle = await fetchVehicleById('4');

            expect(vehicle.name).toBe('Sand Crawler');
            expect(vehicle.model).toBe('Digger Crawler');
            expect(vehicle.vehicle_class).toBe('wheeled');
        });
    });

    describe('fetchStarshipById', () => {
        it('should fetch starship details successfully', async () => {
            const starship = await fetchStarshipById('9');

            expect(starship.name).toBe('Death Star');
            expect(starship.model).toBe('DS-1 Orbital Battle Station');
            expect(starship.starship_class).toBe('Deep Space Mobile Battlestation');
        });
    });
});
