import {Component, EventEmitter, OnInit,} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.html',
  styleUrls: ['./pokemon-cards.component.css']
})
export class PokemonSearchComponent implements OnInit {

  constructor(public pokemonService: PokemonService, public http: HttpClient,) {
  }

  public pokemonApi: any = []; // Array conentente la chiamata all'api
  public pokemon: any = [];
  public onePokemon: any = [];
  public selectedOption: string = ""

  public options = [
    {name: "All", value: ""},
    {name: "Grass", value: "grass"},
    {name: "Normal", value: "normal"},
    {name: "Fighting", value: "fighting"},
    {name: "Flying", value: "flying"},
    {name: "Poison", value: "poison"},
    {name: "Ground", value: "ground"},
    {name: "Rock", value: "rock"},
    {name: "Bug", value: "bug"},
    {name: "Ghost", value: "ghost"},
    {name: "Steel", value: "steel"},
    {name: "Fire", value: "fire"},
    {name: "Water", value: "water"},
    {name: "Electric", value: "electric"},
    {name: "Psychic", value: "psychic"},
    {name: "Ice", value: "ice"},
    {name: "Dragon", value: "dragon"},
    {name: "Dark", value: "dark"},
    {name: "Fairy", value: "fairy"},
  ]

  async ngOnInit() {
    this.pokemonApi = await this.pokemonService.getPokemon() //Chiamo il service e inserisco il response nell'array

    const pokemonCompleteList = async (): Promise<any> => {
      await Promise.all(
        this.pokemonApi.results.map(async (pokemon: any): Promise<any> => { //
          this.onePokemon = await this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).toPromise()
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
    await pokemonCompleteList()

  }

  //Search Input by Pokemon Name or Pokemon Type
  searchText: string = "";
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>()

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.searchText)
    console.log(this.pokemon)
  }

  //Ordine alfabetico, tipo, statistiche
  key = "";
  reverse: boolean = false;

  sort(key: any) {
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

