import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PokemonEvoChain, PokemonSpicies } from '../interfaces/pokemons';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  http = inject(HttpClient);
  pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1025&offset=';
  offset = 0;

  constructor() {}

  getPokemons() {
    return this.http.get<any>(`${this.pokemonsUrl}${this.offset}`).pipe(
      map((resp) => {
        return resp.results;
      })
    );
  }

  getDetallesPokemon(url: string) {
    return this.http.get<any>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  getSpecie(url: string) {
    return this.http.get<PokemonSpicies>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }
  getEvos(url: string) {
    return this.http.get<PokemonEvoChain>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }
}
