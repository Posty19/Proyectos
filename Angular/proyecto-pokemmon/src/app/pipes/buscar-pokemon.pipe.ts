import { Pipe, PipeTransform } from '@angular/core';
import { Pokemons } from '../interfaces/pokemons';

@Pipe({
  name: 'buscarPokemon',
  standalone: true,
})
export class BuscarPokemonPipe implements PipeTransform {
  transform(pokemons: Pokemons[], search?: string): Pokemons[] {
    const searchLower = search?.toLocaleLowerCase();
    return searchLower
      ? pokemons.filter((poke) =>
          poke.name.toLocaleLowerCase().includes(searchLower)
        )
      : pokemons;
  }
}

/*
  return searchLower
      ? pokemons.filter((prod) =>
          prod.name.toLocaleLowerCase().includes(searchLower)
        )
      : pokemons;

*/