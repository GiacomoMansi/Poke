import {Component, OnInit,} from '@angular/core';

import {HttpClient, } from "@angular/common/http";


import {firstValueFrom} from "rxjs";
import {PokemonService} from "../../services/pokemon.service";

export interface Pokemon {
  name: string;
  url: string;

  map(pokemon: any): any;
}

export class PokemonApi {
  count: number = 0;
  next: string = "";
  previous: null | undefined;
  static results: Pokemon;
}


@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.html',
  styleUrls: ['./pokemon-cards.component.css']
})

export class PokemonSearchComponent implements OnInit {


  constructor(public http: HttpClient, public _pokemonService: PokemonService) {
  }





  async ngOnInit() {

  }





  //Configurazione paginazione
  config = {
    itemsPerPage: 30,
    currentPage: 1,
    collection: this._pokemonService.pokemon.length,
  };





}
