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

  public pokemonApi: any = []; // Array contenente la chiamata all'api
  public pokemon: any = [];
  public onePokemon: any = [];
  public selectedOption: string = ""
  public errormessage: string = "";
  public isLoading: boolean = true


  async ngOnInit() {
    await this._pokemonService.getPokemon()
  }

  // async getPokemon() { //To Promise invertito in subscribe
  //   this.http.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=500").subscribe({
  //     next: (result: any,) => {
  //       this.pokemonApi = result.results
  //       const pokemonCompleteList = async (): Promise<any> => {
  //         await Promise.all(
  //           this.pokemonApi.map(async (pokemon: any): Promise<any> => {
  //             this.onePokemon = await firstValueFrom(this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`))
  //               .catch(err =>
  //                 this.errormessage = err.message)//Gestisco gli errori
  //             this.pokemon.push(this.onePokemon) //Inserisco il singolo pokemon nell'array pokemon
  //             //Assegno le statistiche all'oggetto onePokemon
  //             Object.assign(this.onePokemon, {hp: this.onePokemon.stats[0].base_stat})
  //             Object.assign(this.onePokemon, {attack: this.onePokemon.stats[1].base_stat})
  //             Object.assign(this.onePokemon, {defense: this.onePokemon.stats[2].base_stat})
  //             Object.assign(this.onePokemon, {specialAttack: this.onePokemon.stats[3].base_stat})
  //             Object.assign(this.onePokemon, {specialDefense: this.onePokemon.stats[4].base_stat})
  //             Object.assign(this.onePokemon, {speed: this.onePokemon.stats[5].base_stat})
  //             //Assegno il tipo di pokemon all'oggetto onePokemon
  //             Object.assign(this.onePokemon, {typo: this.onePokemon.types[0].type.name})
  //           })
  //         )
  //       }
  //       this.isLoading = false;
  //       pokemonCompleteList()
  //     },
  //     error: (err) => { //Gestisco gli errori del subscribe
  //       console.error(err.message)
  //       this.errormessage = err.message
  //     },
  //     complete: () => {}
  //   })
  // }



  //Configurazione paginazione
  config = {
    itemsPerPage: 30,
    currentPage: 1,
    collection: this.pokemon.length,
  };


  ngOnDestroy() {
    this.pokemonApi.unsubscribe();
  }


}
