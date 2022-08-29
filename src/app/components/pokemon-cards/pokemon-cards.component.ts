import {Component, EventEmitter, OnInit,} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {firstValueFrom} from "rxjs";


@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.html',
  styleUrls: ['./pokemon-cards.component.css']
})
export class PokemonSearchComponent implements OnInit {
  constructor(public pokemonService: PokemonService, public http: HttpClient, private translateService: TranslateService) {
  }

  public pokemonApi: any = []; // Array conentente la chiamata all'api
  public pokemon: any = [];
  public onePokemon: any = [];
  public selectedOption: string = ""
  public args: any = [];
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
    this.pokemonApi = await this.pokemonService.getPokemon() //Chiamo il service e inserisco il response nell'array

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


  //Sorting by name, type, and statistics
  public orderName: boolean = false;
  public orderType: boolean = false;
  public orderHp: boolean = false;
  public orderAttack: boolean = false;
  public orderDefense: boolean = false;
  public orderSpecialAttack: boolean = false;
  public orderSpecialDefense: boolean = false;
  public orderSpeed: boolean = false;

  //Sorting fatto a mano per ogni singola voce(per capire meglio il funzionamento del pipe orderBy)
  // sortPokemonName() {
  //   let multiplier = 1;
  //   if (!this.orderName) {
  //     multiplier = -1
  //   }
  //   this.pokemon.sort((a: any, b: any,) => {
  //     if (a.name < b.name) {
  //       return -1 * multiplier
  //     } else if (a.name > b.name) {
  //       return multiplier;
  //     } else {
  //       return 0
  //     }
  //   })
  //   this.orderName = !this.orderName
  // }
  //
  // sortPokemonType() {
  //   this.pokemon.sort((a: any, b: any,) => {
  //     if (a.typo < b.typo) {
  //       return -1
  //     } else if (a.typo > b.typo) {
  //       if (!this.orderType) {
  //         return -1
  //       }
  //     }
  //     return 0
  //   })
  //   this.orderType = !this.orderType
  // }
  //
  // sortPokemonHp() {
  //   let multiplier = 1;
  //   if (!this.orderHp) {
  //     multiplier = -1
  //   }
  //
  //   this.pokemon.sort((a: any, b: any) => {
  //     if (a.hp < b.hp) {
  //       return -1 * multiplier
  //     } else if (a.hp > b.hp) {
  //       return multiplier;
  //     } else {
  //       return 0
  //     }
  //   })
  //   this.orderHp = !this.orderHp
  // }
  //
  // sortPokemonAttack() {
  //   let multiplier = 1;
  //   if (!this.orderAttack) {
  //     multiplier = -1
  //   }
  //   this.pokemon.sort((a: any, b: any) => {
  //     if (a.attack < b.attack) {
  //       return -1 * multiplier
  //     } else if (a.attack > b.attack) {
  //       return multiplier;
  //     } else {
  //       return 0
  //     }
  //   })
  //   this.orderAttack = !this.orderAttack
  // }
  //
  // sortPokemonDefense() {
  //   let multiplier = 1;
  //   if (!this.orderDefense) {
  //     multiplier = -1
  //   }
  //   this.pokemon.sort((a: any, b: any,) => {
  //     if (a.defense < b.defense) {
  //       return -1 * multiplier
  //     } else if (a.defense > b.defense) {
  //       return multiplier;
  //     } else {
  //       return 0
  //     }
  //   })
  //   this.orderDefense = !this.orderDefense
  // }
  //
  // sortPokemonSpecialAttack() {
  //   let multiplier = 1;
  //   if (!this.orderSpecialAttack) {
  //     multiplier = -1
  //   }
  //   this.pokemon.sort((a: any, b: any) => {
  //     if (a.specialAttack < b.specialAttack) {
  //       return -1 * multiplier
  //     } else if (a.specialAttack > b.specialAttack) {
  //       return multiplier;
  //     } else {
  //       return 0
  //     }
  //   })
  //   this.orderSpecialAttack = !this.orderSpecialAttack
  // }
  //
  // sortPokemonSpecialDefense() {
  //   let multiplier = 1;
  //   if (!this.orderSpecialDefense) {
  //     multiplier = -1
  //   }
  //   this.pokemon.sort((a: any, b: any) => {
  //     if (a.specialDefense < b.specialDefense) {
  //       return -1 * multiplier
  //     } else if (a.specialDefense > b.specialDefense) {
  //       return multiplier;
  //     } else {
  //       return 0
  //     }
  //   })
  //   this.orderSpecialDefense = !this.orderSpecialDefense
  // }
  //
  // sortPokemonSpeed() {
  //   let multiplier = 1;
  //   if (!this.orderSpeed) {
  //     multiplier = -1
  //   }
  //   this.pokemon.sort((a: any, b: any) => {
  //     if (a.speed < b.speed) {
  //       return -1 * multiplier
  //     } else if (a.speed > b.speed) {
  //       return multiplier;
  //     } else {
  //       return 0
  //     }
  //   })
  //   this.orderSpeed = !this.orderSpeed
  // }

}

