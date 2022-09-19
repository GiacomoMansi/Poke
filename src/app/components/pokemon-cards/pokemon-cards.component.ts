import {Component, EventEmitter, OnInit,} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
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
  constructor(public pokemonService: PokemonService, public http: HttpClient, private translateService: TranslateService) {
  }

  public pokemonApi = PokemonApi; // Array contenente la chiamata all'api
  public pokemon: any = [];
  public onePokemon: any = [];
  public selectedOption: string = ""
  public errormessage: string = "";
  public isLoading: boolean = true
  public options = [
    {name: "all", value: ""},
    {name: "grass", value: "grass"},
    {name: "normal", value: "normal"},
    {name: "fighting", value: "fighting"},
    {name: "poison", value: "poison"},
    {name: "ground", value: "ground"},
    {name: "rock", value: "rock"},
    {name: "bug", value: "bug"},
    {name: "ghost", value: "ghost"},
    {name: "steel", value: "steel"},
    {name: "fire", value: "fire"},
    {name: "water", value: "water"},
    {name: "electric", value: "electric"},
    {name: "psychic", value: "psychic"},
    {name: "ice", value: "ice"},
    {name: "dragon", value: "dragon"},
    {name: "dark", value: "dark"},
    {name: "fairy", value: "fairy"},
  ]

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value)
  }

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

