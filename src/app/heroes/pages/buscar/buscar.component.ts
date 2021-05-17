import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  public termino: string = '';
  public heroes: Heroe[] = [];
  public heroeSelected: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  public search() {
    
    this.heroesService.getHeroesByName(this.termino.trim())
      .subscribe((response) => {
        this.heroes = response;
      })

  }

  public optionSelected(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.heroeSelected = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroeById(heroe.id!)
      .subscribe((response) => {
        this.heroeSelected = response;
      })
   
  }

}
