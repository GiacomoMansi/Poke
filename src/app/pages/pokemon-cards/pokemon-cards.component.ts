import { Component, OnInit } from '@angular/core';
import { PokemonService} from "../../services/pokemon.service";
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.html',
  styleUrls: ['./pokemon-cards.component.css']
})
export class PokemonSearchComponent implements OnInit {

  constructor(public pokemonService: PokemonService, public http: HttpClient,) { }
public pokemonApi: any = [];
public allPokemonList: any = [];
public pokemon:  any = [];
public selectBasicLoading = false;
public item: any = []
public hp: any;



  async ngOnInit() {
    this.pokemonApi = await this.pokemonService.getPokemon() //Chiamo il service
    this.allPokemonList = await this.pokemonApi.results //Inserisco il service nell'array allPokemonList

    const pokemonCompleteList = async (): Promise<any> => {
      await Promise.all(
        this.allPokemonList.map(async (pokemon: any): Promise<any> => { //
          const aPokemon = await this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).toPromise()
          this.pokemon.push(aPokemon)
        })
      )
    }
    await pokemonCompleteList()
    console.log(this.pokemon[0].types[0].type.name)
  }

  //Sort by name
  key = " ";
  reverse: boolean = false;
  sort(key: any) {
  this.key = key
    this.reverse = !this.reverse
    console.log(this.pokemon)
  }
}

