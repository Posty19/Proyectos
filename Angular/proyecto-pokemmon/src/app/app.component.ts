import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopkemonsComponent } from "./popkemons/popkemons.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PopkemonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-pokemmon';
}
