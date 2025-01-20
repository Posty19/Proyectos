import { Routes } from '@angular/router';
import { PopkemonDetalleComponent } from './popkemon-detalle/popkemon-detalle.component';
import { PopkemonsComponent } from './popkemons/popkemons.component';

export const routes: Routes = [
  {
    path: 'pokemons',
    children: [
      { path: '', component: PopkemonsComponent,title: 'Pokedex', },
      { path: 'detalle', component: PopkemonDetalleComponent,title: 'Pokemon' },
    ],
  },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: '**', redirectTo: '/pokemons'}
];
