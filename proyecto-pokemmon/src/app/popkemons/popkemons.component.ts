import { Component, computed, inject, NgModule, signal } from '@angular/core';
import { PokemonsService } from '../services/pokemons.service';
import { Pokemons } from '../interfaces/pokemons';
import { NgClass, NgFor, ViewportScroller } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { BuscarPokemonPipe } from '../pipes/buscar-pokemon.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'pokemons',
  imports: [BuscarPokemonPipe,FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './popkemons.component.html',
  styleUrl: './popkemons.component.css'
})
export class PopkemonsComponent {
  viewportScroller = inject(ViewportScroller);
  pokemonsService = inject(PokemonsService);
  pokemons = signal<Pokemons[]>([]);
  search = signal('')

  filterPokemons= computed(()=>
    this.pokemons().filter((p)=>
      p.name.toLowerCase().includes(this.search().toLocaleLowerCase())
    )
  )

  constructor() {
    this.obtenerPokemons();
  }

  obtenerPokemons() {
    this.pokemonsService
    .getPokemons()
    .subscribe({
      next: (pokemons) => this.pokemons.set(pokemons),
      error: (error: HttpErrorResponse) => console.error(`Error obteniendo pokemon: `, error),
    });
  }
}
