import { Component, OnInit } from '@angular/core';
import { PokemonService} from "../../services/pokemon.service";
import {HttpClient} from "@angular/common/http";




@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {

  constructor(public pokemonService: PokemonService, public http: HttpClient,) { }
public pokemonApi: any = [];
public allPokemonList: any = [];
public pokemon:  any = [];



  async ngOnInit() {
    this.pokemonApi = await this.pokemonService.getPokemon()
    this.allPokemonList = await this.pokemonApi.results
    let listObjects: any = [];
    const pokemonCompleteList = async (): Promise<any> => {
      await Promise.all(
        this.allPokemonList.map(async (pokemon: any): Promise<any> => {
          const aPokemon = await this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).toPromise()
          this.pokemon.push(aPokemon)
        })
      )
      return listObjects;
    }
    await pokemonCompleteList()
    console.log(this.pokemon)
  }
}
