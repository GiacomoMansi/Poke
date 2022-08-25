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
public hp: any= [];
public aPokemon: any = [];

  async ngOnInit() {
    this.pokemonApi = await this.pokemonService.getPokemon() //Chiamo il service
    this.allPokemonList = await this.pokemonApi.results //Inserisco il service nell'array allPokemonList

    const pokemonCompleteList = async (): Promise<any> => {
      await Promise.all(
        this.allPokemonList.map(async (pokemon: any): Promise<any> => { //
           this.aPokemon = await this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).toPromise()
          this.pokemon.push(this.aPokemon)
          //Assegno le statistiche all'oggetto
          Object.assign(this.aPokemon, {hp: this.aPokemon.stats[0].base_stat})
          Object.assign(this.aPokemon, {attack: this.aPokemon.stats[1].base_stat})
          Object.assign(this.aPokemon, {defense: this.aPokemon.stats[2].base_stat})
          Object.assign(this.aPokemon, {specialAttack: this.aPokemon.stats[3].base_stat})
          Object.assign(this.aPokemon, {specialDefense: this.aPokemon.stats[4].base_stat})
          Object.assign(this.aPokemon, {speed: this.aPokemon.stats[5].base_stat})
          //Assegno il tipo di pokemon
          Object.assign(this.aPokemon, {typo: this.aPokemon.types[0].type.name})

          //Per ogni pokemon inserisco il rispettivo typo
         /* if(await this.aPokemon.types[0].type.name == "grass"){
            Object.assign(this.aPokemon, {typo: "grass"})
          } else if(await this.aPokemon.types[0].type.name == "normal"){
            Object.assign(this.aPokemon,{typo: "normal"})
          }
          else if(await this.aPokemon.types[0].type.name == "fire"){
            Object.assign(this.aPokemon,{typo: "fire"})
          }else if(await this.aPokemon.types[0].type.name == "water"){
            Object.assign(this.aPokemon,{typo: "water"})
          }else if(await this.aPokemon.types[0].type.name == "poison"){
            Object.assign(this.aPokemon,{typo: "poison"})
          }else if(await this.aPokemon.types[0].type.name == "ground"){
            Object.assign(this.aPokemon,{typo: "ground"})
          }else if(await this.aPokemon.types[0].type.name == "ghost"){
            Object.assign(this.aPokemon,{typo: "ghost"})
          }else if(await this.aPokemon.types[0].type.name == "electric"){
            Object.assign(this.aPokemon,{typo: "electric"})
          }else if(await this.aPokemon.types[0].type.name == "psychic"){
            Object.assign(this.aPokemon,{typo: "psychic"})
          }else if(await this.aPokemon.types[0].type.name == "rock"){
            Object.assign(this.aPokemon,{typo: "rock"})
          }else if(await this.aPokemon.types[0].type.name == "bug"){
            Object.assign(this.aPokemon,{typo: "bug"})
          }else if(await this.aPokemon.types[0].type.name == "fighting"){
            Object.assign(this.aPokemon,{typo: "fighting"})
          }else if(await this.aPokemon.types[0].type.name == "fairy"){
            Object.assign(this.aPokemon,{typo: "fairy"})
          }else if(await this.aPokemon.types[0].type.name == "ice"){
            Object.assign(this.aPokemon,{typo: "ice"})
          }else if(await this.aPokemon.types[0].type.name == "steel"){
            Object.assign(this.aPokemon,{typo: "steel"})
          }else if(await this.aPokemon.types[0].type.name == "dragon"){
            Object.assign(this.aPokemon,{typo: "dragon"})
          }else if(await this.aPokemon.types[0].type.name == "dark"){
            Object.assign(this.aPokemon,{typo: "dark"})
          }else if(await this.aPokemon.types[0].type.name == "unknown"){
            Object.assign(this.aPokemon,{typo: "unknown"})
          }else if(await this.aPokemon.types[0].type.name == "shadow"){
            Object.assign(this.aPokemon,{typo: "shadow"})
          }else {
            console.log("non c'è")
          }*/
        })

      )
    }
    await pokemonCompleteList()

console.log(this.hp)
    console.log(this.pokemon)


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

