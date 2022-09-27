import {Component, EventEmitter, Input, OnInit,} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {HttpClient} from "@angular/common/http";

import {firstValueFrom} from "rxjs";

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


  constructor(public pokemonService: PokemonService, public http: HttpClient,) {
  }

  public pokemonApi = PokemonApi; // Array contenente la chiamata all'api
  public pokemon: any = [];
  public onePokemon: any = [];
  public selectedOption: string = ""
  public errormessage: string = "";
  public isLoading: boolean = true


  async ngOnInit() {


    this.pokemonApi = await <any>this.pokemonService.getPokemon()
      .catch(error => {
        return this.errormessage = error.message
      }) //Chiamo il service e inserisco il response nell'array, e catturo l'errore per poi restituirlo all'utente

    const pokemonCompleteList = async (): Promise<any> => {
      await Promise.all(
        this.pokemonApi.results.map(async (pokemon: any): Promise<any> => {
          this.onePokemon = await firstValueFrom(this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`))
          this.pokemon.push(this.onePokemon) //Inserisco il singolo pokemon nell'array pokemon
          //Assegno le statistiche all'oggetto onePokemon
          Object.assign(this.onePokemon, {hp: this.onePokemon.stats[0].base_stat})
          Object.assign(this.onePokemon, {attack: this.onePokemon.stats[1].base_stat})
          Object.assign(this.onePokemon, {defense: this.onePokemon.stats[2].base_stat})
          Object.assign(this.onePokemon, {specialAttack: this.onePokemon.stats[3].base_stat})
          Object.assign(this.onePokemon, {specialDefense: this.onePokemon.stats[4].base_stat})
          Object.assign(this.onePokemon, {speed: this.onePokemon.stats[5].base_stat})
          //Assegno il tipo di pokemon all'oggetto onePokemon
          Object.assign(this.onePokemon, {typo: this.onePokemon.types[0].type.name})
        })
      )
    }
    this.isLoading = false;
    await pokemonCompleteList()
  }

  //Input per la ricerca
  searchText: string = "";
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>()

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.searchText)
  }

  //Ordine alfabetico, tipo, statistiche
  key = "";
  reverse: boolean = false;

  sort(key: any,) {
    this.key = key
    this.reverse = !this.reverse
  }

  //Configurazione paginazione
  config = {
    itemsPerPage: 30,
    currentPage: 1,
    collection: this.pokemon.length,
  };


}

export class items {
}
