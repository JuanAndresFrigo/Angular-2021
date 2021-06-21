import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html'
})
export class BuscarComponent implements OnInit {

  termino: string = '';

  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe | undefined;

  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroeService.getSugerencia(this.termino)
      .subscribe(heroes => this.heroes = heroes);
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    console.log("event: ", event.option.value);

    if (!event.option.value) {
      this.termino = 'Termino no encontrado';
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroeService.getHeroePorId(heroe.id!)
      .subscribe(heroe => this.heroeSeleccionado = heroe);

  }
}
