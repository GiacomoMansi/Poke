import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(public translateService: TranslateService, public _pokemonService: PokemonService) {
  }

  async ngOnInit() {
    await this._pokemonService.getPokemon()
    await this._pokemonService.filterList()
  }
  getPokemon() {
    return this._pokemonService.getPokemon()
  }
  public selectLanguage(event: any) {
    this.translateService.use(event.target.value)
  }
}
