import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  PokemonDetails,
  PokemonSpicies,
  PokemonEvoChain,
  flavourText,
} from '../interfaces/pokemons';
import { PokemonsService } from '../services/pokemons.service';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'popkemon-detalle',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './popkemon-detalle.component.html',
  styleUrl: './popkemon-detalle.component.css',
})
export class PopkemonDetalleComponent {
  url = input.required<string>();
  urlCambio = 'https://pokeapi.co/api/v2/pokemon/';
  pokemon = signal<PokemonDetails | null>(null);
  pokemonSpicies = signal<PokemonSpicies | null>(null);
  pokemonEvoChain = signal<PokemonEvoChain | null>(null);
  evolutions: string[] = [];
  flavourText='';
  pokemonEvos = signal<PokemonDetails[]>([]);
  pokeFront = true;
  pokeMale = true;
  #changeDetector = inject(ChangeDetectorRef);

  tiposPokemons: { [key: string]: { color: string; icon: string } } = {
    normal: { color: 'text-bg-light', icon: 'bi-circle-fill' },
    fire: { color: 'text-bg-danger', icon: 'bi-fire' },
    water: { color: 'text-bg-primary', icon: 'bi-droplet-fill' },
    electric: { color: 'text-bg-warning', icon: 'bi-lightning-fill' },
    grass: { color: 'text-bg-success', icon: 'bi-tree-fill' },
    ice: { color: 'text-bg-info', icon: 'bi-snow' },
    fighting: { color: 'text-bg-danger', icon: 'bi-hand-index-thumb' },
    poison: { color: 'text-bg-secondary', icon: 'bi-emoji-dizzy' },
    ground: { color: 'text-bg-warning', icon: 'bi-signpost-split' },
    flying: { color: 'text-bg-info', icon: 'bi-wind' },
    psychic: { color: 'text-bg-danger', icon: 'bi-eye-fill' },
    bug: { color: 'text-bg-success', icon: 'bi-bug-fill' },
    rock: { color: 'text-bg-secondary', icon: 'bi-gem' },
    ghost: { color: 'text-bg-dark', icon: 'bi-emoji-neutral' },
    dragon: { color: 'text-bg-primary', icon: 'bi-bullseye' },
    dark: { color: 'text-bg-dark', icon: 'bi-moon-fill' },
    steel: { color: 'text-bg-secondary', icon: 'bi-cpu-fill' },
    fairy: { color: 'text-bg-light', icon: 'bi-stars' },
  };

  pokemonsService = inject(PokemonsService);

  constructor() {
    effect(() => this.obtenerDatosPoke(this.url()));
    //this.pokemonEvos().pop
  }

  voltearPoke() {
    this.pokeFront = !this.pokeFront;
  }

  changeGender(){
    if(this.pokemon()!.sprites.other.showdown.front_female){
      this.pokeMale=!this.pokeMale;
    }
  }

  obtenerDatosPoke(url: string) {
    this.pokemonsService.getDetallesPokemon(url).subscribe({
      next: (pokemon) => {
        this.pokemon.set(pokemon);
        console.log(this.pokemon());
        this.obtenerSpicies();
      },
      error: (error: HttpErrorResponse) =>
        console.error(`Error obteniendo pokemon: `, error),
    });
  }

  obtenerSpicies() {
    this.pokemonsService.getSpecie(this.pokemon()?.species.url!).subscribe({
      next: (pokemon) => {
        this.pokemonSpicies.set(pokemon);
        console.log('****************************************************************');
        console.log(this.pokemonSpicies()?.flavor_text_entries);
        this.setFlavourText(this.pokemonSpicies()?.flavor_text_entries);
        this.obtenerEvos();
      },
      error: (error: HttpErrorResponse) =>
        console.error(`Error obteniendo pokemon: `, error),
    });
  }
  setFlavourText(flavorTextEntries: flavourText[] | undefined) {
    flavorTextEntries!.forEach(element => {
        if(element.language.name==='en'){
          this.flavourText=element.flavor_text;
          this.#changeDetector.markForCheck();
          return;
        }
    });
  }

  obtenerEvos() {
    this.pokemonsService
      .getEvos(this.pokemonSpicies()?.evolution_chain.url!)
      .subscribe({
        next: (pokemon) => {
          this.pokemonEvoChain.set(pokemon);
          console.log(this.pokemonEvoChain()?.chain);
          this.#setEvosUrls(this.pokemonEvoChain()!);
        },
        error: (error: HttpErrorResponse) =>
          console.error(`Error obteniendo pokemon: `, error),
      });
  }
  #setEvosUrls(evoChain: PokemonEvoChain) {
    this.evolutions.splice(0);
    this.pokemonEvos().splice(0);
    if (evoChain.chain.evolves_to.length) {
      const regex = /\/(\d+)\//;
      let match = this.pokemonEvoChain()!.chain.species.url.match(regex);
      this.evolutions.push(match![1]);
      //console.log(match![1]);
      //console.log('primerita forma/bebe');
      evoChain.chain.evolves_to.forEach((evos) => {
        match = evos.species.url.match(regex);
        console.log('id--:' + match![1]);
        this.evolutions.push(match![1]);
        //console.log('Evolucion 1');
        if (evos.evolves_to?.length) {
          evos.evolves_to.forEach((evos2) => {
            match = evos2.species.url.match(regex);
            console.log('id--:' + match![1]);
            this.evolutions.push(match![1]);
          });
          //console.log('evolucion extra');
        } else {
          console.log('No hay mas evoluciones/eevee');
        }
      });
      this.#buildEvolutionsChain(this.evolutions);
      //console.log(this.evolutions);
    } else {
      console.log('el pokemon no evoluviona');
    }
    //console.log(this.evolutions);
  }

  #buildEvolutionsChain(evosUrl: string[]) {
    if (evosUrl.length) {
      //urlCambio
      evosUrl.forEach((url) => {
        this.pokemonsService
          .getDetallesPokemon(this.urlCambio + url)
          .subscribe({
            next: (pokemon) => {
              this.pokemonEvos()!.push(pokemon);
              this.#changeDetector.markForCheck();
            },
            error: (error: HttpErrorResponse) =>
              console.error(`Error obteniendo pokemon: `, error),
          });
      });
      console.log(this.pokemonEvos());
    } else {
      console.log('No hay evoluciones');
    }
  }

}
